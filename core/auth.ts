import * as Oak    from "land:oak";
import * as bcrypt from "land:bcrypt";
import * as JWT    from "land:djwt"
import * as HTTP   from "std:status";
import * as Model  from "app:model";

const json: Oak.BodyOptions<"json"> = { type: "json" }

function generateToken(user: any) {
  const token = JWT.create(); // TODO: finish
  return token;
}

async function signup(context : Oak.Context) {
	const body: Model.SchemaUserSignUp = await context.request.body(json).value;
	const uuid = crypto.randomUUID();
	const { password } = body;
	const hash = await bcrypt.hash(password);
	await Model.User.create({
		uuid:     uuid,
		email:    body.email,
		username: body.username,
		password: hash
	})
	context.response.status = HTTP.Status.Created;
	context.response.body = {
		message: "Succefully created user",
		data: {
			uuid:     uuid,
			email:    body.email,
			username: body.username
		}
	}
}

async function login(context : Oak.Context) {
	const body = await context.request.body(json).value;

	const user = await Model.User.where("email", body.email).get();
	if (!user) {
		context.response.status = HTTP.Status.Unauthorized;
		context.response.body = {
			message: "Invalid email or password"
		};
		return;
	}

	const hashedPassword = await bcrypt.hash(user.password);

	const passwordMatch = await bcrypt.compare(body.password, hashedPassword);
	if (!passwordMatch) {
		context.response.status = HTTP.Status.Unauthorized;
		context.response.body = {
			message: "Invalid email or password"
		};
		return;
	}

	// Missing token final

}

export {
	login,
	signup
}
