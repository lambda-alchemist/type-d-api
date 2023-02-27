import * as Oak    from "land:oak";
import * as bcrypt from "land:bcrypt";
import * as JWT    from "land:djwt"
import * as HTTP   from "std:status";
import * as Model  from "app:model";

const json: Oak.BodyOptions<"json"> = { type: "json" }

const crypto_key = await crypto.subtle.generateKey(
	{ name: "HMAC", hash: "SHA-512" },
	true,
	["sign", "verify"],
);

async function signup(context : Oak.Context) {
	const body: Model.SchemaUserSignUp = await context.request.body(json).value;
	const count = await Model.User.where("email", body.email).count();
	if (count !== 0) {
		context.response.status = HTTP.Status.BadRequest;
		context.response.body = {
			message: "Email already registered, try again."
		}
		return;
	}
	const data = {
		uuid:     crypto.randomUUID(),
		email:    body.email,
		username: body.username,
		password: await bcrypt.hash(body.password)
	}
	await Model.User.create(data)
	context.response.status = HTTP.Status.Created;
	context.response.body = {
		message: "Succefully created user",
		data: {
			email:    body.email,
			username: body.username
		}
	}
}

async function login(context: Oak.Context) {
	const body: Model.SchemaUserLogIn = await context.request.body(json).value;
	const user = await Model.User.where("email", body.email).first();
	if (!user) {
		context.response.status = HTTP.Status.Unauthorized;
		context.response.body = {
			message: "Invalid email or password1"
		};
		return;
	}
	const { password } = await Model.User.where("email", body.email).select("password").first();
	const password_match = await bcrypt.compare(body.password, password);
	if (!password_match) {
		context.response.status = HTTP.Status.Unauthorized;
		context.response.body = {
			message: "Invalid email or password2"
		};
		return;
	}

	const token = await JWT.create(
		{
			alg: "HS512",
			typ: "JWT"
		},
		{
			sub: user.uuid?.toString(),
			exp: JWT.getNumericDate(60 * 60),
		},
		crypto_key
	);

	context.cookies.set("jwt", token);
	context.response.status = HTTP.Status.OK;
	context.response.body = {
		message: "Successfully logged in"
	};
}

export {
	login,
	signup
}
