import { Context, Router } from "land:oak";
import * as Handle from "mvc:view"

const auth = new Router;
const crud = new Router;

auth
	// .post("/auth/login",  async (context: Context) => await Handle.auth_login(context))
	// .post("/auth/logout", async (context: Context) => await Handle.auth_logout(context))

crud
	.get   ("/crud/task",     async (context: Context) => await Handle.task_list(context))
	.post  ("/crud/task",     async (context: Context) => await Handle.task_create(context))
	.get   ("/crud/task/:id", async (context: Context) => await Handle.task_retrieve(context))
	.patch ("/crud/task/:id", async (context: Context) => await Handle.task_modify(context))
	.put   ("/crud/task/:id", async (context: Context) => await Handle.task_update(context))
	.delete("/crud/task/:id", async (context: Context) => await Handle.task_delete(context))
	// .get   ("/crud/user",     async (context: Context) => await Handle.user_list(context))
	// .post  ("/crud/user",     async (context: Context) => await Handle.user_create(context))
	// .get   ("/crud/user/:id", async (context: Context) => await Handle.user_retrieve(context))
	// .patch ("/crud/user/:id", async (context: Context) => await Handle.user_modify(context))
	// .put   ("/crud/user/:id", async (context: Context) => await Handle.user_update(context))
	// .delete("/crud/user/:id", async (context: Context) => await Handle.user_delete(context))

export {
	auth,
	crud
};
