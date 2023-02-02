import * as Oak from "land:oak";
import * as Color from "std:color";

const http_reqs = async (context: Oak.Context, next: Function) => {
	await next();
	const date   = new Date;
	const uri    = context.request.url.pathname;
	const method = context.request.method;
	const host   = context.request.url.host;
	const status = context.response.status;
	const time   = context.response.headers.get("X-Response-Time");
	const text   =
	`[${Color.brightCyan(date.toISOString())}] - ${method} ${status} ${uri} ${time}`
	console.log(text);
}

const json_only = async (context: Oak.Context, next: Function) => {
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

export { http_reqs, json_only };
