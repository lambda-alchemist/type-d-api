import * as Oak     from "land:oak";
import * as Crud    from "api:crud";
import * as Auth    from "api:auth";
import * as Utility from "api:utility";

const api = new Oak.Router();
const auth = new Oak.Router();
const task = new Oak.Router();
const user = new Oak.Router();

auth
	.post("/login",  async context => await Auth.login(context))
	.post("/logout", async context => await Auth.logout(context))
	.post("/signup", async context => await Auth.signup(context))

user
	.get   ("/user",     async context => await Crud.user_list(context))
	.post  ("/user",     async context => await Crud.user_create(context))
	.get   ("/user/:id", async context => await Crud.user_retrieve(context))
	.patch ("/user/:id", async context => await Crud.user_modify(context))
	.put   ("/user/:id", async context => await Crud.user_update(context))
	.delete("/user/:id", async context => await Crud.user_delete(context))

task
	.get   ("/task",     async context => await Crud.task_list(context))
	.post  ("/task",     async context => await Crud.task_create(context))
	.get   ("/task/:id", async context => await Crud.task_retrieve(context))
	.patch ("/task/:id", async context => await Crud.task_modify(context))
	.put   ("/task/:id", async context => await Crud.task_update(context))
	.delete("/task/:id", async context => await Crud.task_delete(context))

api
	.use("/auth", auth.routes(), auth.allowedMethods())
	.use("/crud", user.routes(), user.allowedMethods())
	.use("/crud", task.routes(), task.allowedMethods())

export { api }
