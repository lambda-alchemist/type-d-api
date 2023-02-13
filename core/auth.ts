import * as Oak    from "land:oak";
import * as bcrypt from "land:bcrypt";
import * as DJWT   from "land:djwt"
import * as HTTP   from "std:status";
import * as Model  from "mvc:model";
import * as Crud   from "mvc:view:crud";

const json: Oak.BodyOptions<"json"> = { type: "json" }

async function auth_login(context : Oak.Context) {
	const body = await context.request.body(json).value;

}

async function auth_logout(context : Oak.Context) {
	const body = await context.request.body(json).value;

}

async function auth_signup(context : Oak.Context) {
	const body = await context.request.body(json).value;

}

export
