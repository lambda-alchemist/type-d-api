import { Context, Router } from "land:oak";
import { root_api, root_rest } from "router/view.ts"

const router = new Router;

router
	.get("/",     (context: Context) => root_api(context))
	.get("/rest", (context: Context) => root_rest(context))

	// .get("/rest/user/", (context: Context) => crud_user.list(context))



export { router };
