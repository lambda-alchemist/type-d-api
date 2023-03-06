import * as Oak     from "land:oak";
import * as Crud    from "app:crud";
import * as Auth    from "app:auth";

const app  = new Oak.Router();
const page = new Oak.Router();
const dist = new Oak.Router();
const auth = new Oak.Router();
const task = new Oak.Router();
const user = new Oak.Router();

const pages = `${Deno.cwd()}/core/pages`;
const media = `${Deno.cwd()}/core/static`;

const page_land   = { root: pages, path: "index.html" };
const page_login  = { root: pages, path: "login.html" };
const page_signup = { root: pages, path: "signup.html" };
const page_lister = { root: pages, path: "lister.html" };
const page_maker  = { root: pages, path: "maker.html" };
const logo     = { root: media, path: "gear-logo.png" };
const favicon  = { root: media, path: "gear-icon.ico" };

page
	.get("/",       async context => await context.send(page_land))
	.get("/login",  async context => await context.send(page_login))
	.get("/signup", async context => await context.send(page_signup))
	.get("/lister", async context => await context.send(page_lister))
	.get("/maker",  async context => await context.send(page_maker))
	.get("/logo",   async context => await context.send(logo))
	.get("/fav",    async context => await context.send(favicon))

dist
	.get("/login",  async context => await context.send(login_form))
	.get("/signup", async context => await context.send(signup_form))
	.get("/lister", async context => await context.send(lister_app))
	.get("/maker",  async context => await context.send(maker_app))

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
	.use("",          page.routes(), page.allowedMethods())
	.use("/api/auth", auth.routes(), auth.allowedMethods())
	.use("/api/crud", user.routes(), user.allowedMethods())
	.use("/api/crud", task.routes(), task.allowedMethods())

export { app }
