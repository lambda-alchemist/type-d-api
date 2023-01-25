import { Context, Router } from "land:oak";
import { root_api, root_crud, root_auth } from "router/view.ts"

const router = new Router;

router
	.get("/",     (context: Context) => root_api(context))
	.get("/rest", (context: Context) => root_crud(context))
	.get("/auth", (context: Context) => root_auth(context))

export default router;
