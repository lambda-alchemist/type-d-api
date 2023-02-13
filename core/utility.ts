import * as Oak   from "land:oak";
import * as djwt  from "land:djwt";
import * as HTTP  from "std:status";
import * as Color from "std:color";

async function auth(context: Oak.Context, next: VoidFunction) {
	const auth = context.request.headers.get("Authorization");
	if (!auth) {
		context.response.status = HTTP.Status.Unauthorized;
		context.response.body = { message: "Not Authorized" };
		return;
	}
	const jwt = auth.replace("Bearer ", "");
	try {
		const data = djwt.verify(jwt, jwt_key)
	} catch {
		console.log("error")
	}
	await next();
}
async function json(context: Oak.Context, next: Function) {
	context.response.headers.set("Content-Type", "application/json");
	if (context.request.headers.get("Content-Type") !== "application/json") {
		context.response.status = 400;
		context.response.body = {
			error: "Invalid Content-Type, only application/json is accepted"
		};
		return;
	}
	await next();
}

async function logger(context: Oak.Context, next: Function) {
	await next();
	const date   = new Date().toISOString();
	const host   = context.request.url.hostname;
	const path   = context.request.url.pathname;
	const method = context.request.method;
	const status = context.response.status;
	const time   = context.response.headers.get("X-Response-Time");
	const text   =
		`[${Color.brightCyan(date.slice(0, 10))} ` +
		`${Color.brightCyan(date.slice(11, 19))}] - ` +
		`${host} ${status} ${method} ${path} ${time}`;
	console.log(text);
}

export { json, logger };
