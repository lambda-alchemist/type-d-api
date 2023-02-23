import * as Oak     from "land:oak";
import * as Crud    from "app:crud";
import * as Auth    from "app:auth";
import * as Utility from "app:utility";

const app  = new Oak.Router();
const html = new Oak.Router();
const auth = new Oak.Router();
const task = new Oak.Router();
const user = new Oak.Router();

const page = {
	lander: {
		root: "./pages",
		index: "index.html",
		immutable: false
	} satisfies Oak.SendOptions,
	singin: {
		root: "./pages",
		index: "index.html",
		immutable: false
	} satisfies Oak.SendOptions,
	signup: {
		root: "./pages",
		index: "index.html",
		immutable: false
	} satisfies Oak.SendOptions,
	tasker: {
		root: "./pages",
		index: "index.html",
		immutable: false
	} satisfies Oak.SendOptions,
}

html
	.get("/lander", async context => await context.send(page.lander))
	.get("/login",  async context => await context.send(page.singin))
	.get("/signup", async context => await context.send(page.signup))
	.get("/tasker", async context => await context.send(page.tasker))

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

app
	.use("/page",     html.routes(), html.allowedMethods())
	.use("/api/auth", auth.routes(), auth.allowedMethods())
	.use("/api/crud", user.routes(), user.allowedMethods())
	.use("/api/crud", task.routes(), task.allowedMethods())

export { app }
