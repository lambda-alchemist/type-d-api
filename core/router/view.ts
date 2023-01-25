import { Context } from "land:oak";
import json_api from "router/url.json" assert { type: 'json' };

function root_api(context: Context): void {
	context.response.body = "Welcome to the type-d-api!";
}

function root_rest(context: Context): void {
	context.response.body = JSON.stringify(json_api);
}

export {
	root_api,
	root_rest,
}
