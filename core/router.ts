import * as Oak     from "land:oak";
import * as Crud    from "app:crud";
import * as Auth    from "app:auth";

const app  = new Oak.Router();
const page = new Oak.Router();
const dist = new Oak.Router();
const auth = new Oak.Router();
const task = new Oak.Router();
const user = new Oak.Router();

const html   = `${Deno.cwd()}/core/page`;
const pub    = `${Deno.cwd()}/core/pub`;
const script = `${Deno.cwd()}/core/script`

const pages = {
	land:   { root: html, path: "index.html"  },
	login:  { root: html, path: "login.html"  },
	signup: { root: html, path: "signup.html" },
	lister: { root: html, path: "lister.html" },
	maker:  { root: html, path: "maker.html"  },
}

const imgs = {
	logo:    { root: pub, path: "gear-logo.png" },
	favicon: { root: pub, path: "gear-icon.ico" },
}

const scripts = {
	signup: { root: script, path: "signup.js" },
	login:  { root: script, path: "login.js"  },
	lister: { root: script, path: "lister.js" },
	maker:  { root: script, path: "maker.js"  },
}

page
	.get("/",       async context => await context.send(pages.land))
	.get("/login",  async context => await context.send(pages.login))
	.get("/signup", async context => await context.send(pages.signup))
	.get("/lister", async context => await context.send(pages.lister))
	.get("/maker",  async context => await context.send(pages.maker))
	.get("/logo",   async context => await context.send(imgs.logo))
	.get("/fav",    async context => await context.send(imgs.favicon))

dist
	.get("/login",  async context => await context.send(scripts.login))
	.get("/signup", async context => await context.send(scripts.signup))
	.get("/lister", async context => await context.send(scripts.lister))
	.get("/maker",  async context => await context.send(scripts.maker))

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
	.use("/js",       dist.routes(), dist.allowedMethods())
	.use("/api/auth", auth.routes(), auth.allowedMethods())
	.use("/api/crud", user.routes(), user.allowedMethods())
	.use("/api/crud", task.routes(), task.allowedMethods())

export { app }
