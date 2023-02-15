import * as Oak    from "land:oak";
import * as bcrypt from "land:bcrypt";
import * as JWT    from "land:djwt"
import * as HTTP   from "std:status";
import * as Model  from "self:model";

const json: Oak.BodyOptions<"json"> = { type: "json" }

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

}

async function logout(context : Oak.Context) {
	const body = await context.request.body(json).value;

}

export {
	login,
	logout,
	signup
}
