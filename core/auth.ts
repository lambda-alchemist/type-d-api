import * as Oak    from "land:oak";
import * as bcrypt from "land:bcrypt";
import * as JWT    from "land:djwt"
import * as HTTP   from "std:status";
import * as Model  from "self:model";
import * as Crud   from "self:crud";

const json: Oak.BodyOptions<"json"> = { type: "json" }

async function login(context : Oak.Context) {
	const body = await context.request.body(json).value;

}

async function logout(context : Oak.Context) {
	const body = await context.request.body(json).value;

}

async function signup(context : Oak.Context) {
	const body = await context.request.body(json).value;

}

export {
	login,
	logout,
	signup
}
