import { Context } from "land:oak";
import json_api  from "router/root.json" assert { type: 'json' };
import json_crud from "router/crud.json" assert { type: 'json' };
import json_auth from "router/auth.json" assert { type: 'json' };

function  root_api(context: Context): void { context.response.body = json_api; }
function root_crud(context: Context): void { context.response.body = json_crud; }
function root_auth(context: Context): void { context.response.body = json_auth; }

export {
	root_api,
	root_crud,
	root_auth
};
