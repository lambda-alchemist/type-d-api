import * as Oak     from "land:oak";
import * as Crud    from "app:crud";
import * as Auth    from "app:auth";

const app  = new Oak.Router();
const html = new Oak.Router();
const auth = new Oak.Router();
const task = new Oak.Router();
const user = new Oak.Router();

const pages = `${Deno.cwd()}/core/pages`
const media = `${Deno.cwd()}/core/static`

const landing = { root: pages, path: "index.html" }
const login   = { root: pages, path: "login.html" }
const signup  = { root: pages, path: "signup.html" }
const lister  = { root: pages, path: "task-lister.html" }
const maker   = { root: pages, path: "task-maker.html" }
const logo    = { root: media, path: "gear-logo.png" }

html
	.get("/",       async context => await context.send(landing))
	.get("/login",  async context => await context.send(login))
	.get("/signup", async context => await context.send(signup))
	.get("/lister", async context => await context.send(lister))
	.get("/maker",  async context => await context.send(maker))
	.get("/logo",   async context => await context.send(logo))

auth
	.post("/login",  async context => await Auth.login(context))
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
	.use("",          html.routes(), html.allowedMethods())
	.use("/api/auth", auth.routes(), auth.allowedMethods())
	.use("/api/crud", user.routes(), user.allowedMethods())
	.use("/api/crud", task.routes(), task.allowedMethods())

export { app }
