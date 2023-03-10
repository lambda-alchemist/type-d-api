import * as Oak     from "land:oak";
import * as djwt    from "land:djwt";
import * as HTTP    from "std:status";
import * as Color   from "std:color";

export const crypto_key = await crypto.subtle.generateKey(
	{ name: "HMAC", hash: "SHA-512" },
	true,
	["sign", "verify"],
);

export async function auth(context: Oak.Context, next: Function) {
	const auth = context.request.headers.get("Authorization");
	if (!auth) {
		context.response.status = HTTP.Status.Unauthorized;
		context.response.body = { message: "No valid Authorization header found" };
		return;
	}
	const jwt = auth.replace("Bearer ", "");

	// awaiting

	await next();
}

export async function json(context: Oak.Context, next: Function) {
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

export async function logger(context: Oak.Context, next: Function) {
	await next();
	const date   = new Date().toISOString().slice(0,  10);
	const time   = new Date().toISOString().slice(11, 19);
	const host   = context.request.url.hostname;
	const path   = context.request.url.pathname;
	const method = context.request.method;
	const status = context.response.status;
	const text
		= `[${Color.brightCyan(date)} ${Color.brightCyan(time)}] - `
		+ `${host} ${status} ${method} ${path}`;
	console.log(text);
}
