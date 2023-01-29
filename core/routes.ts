import { Context, Router } from "land:oak";
import * as handle from "./view.ts"

const AUTH = new Router;
const CRUD = new Router;

AUTH

CRUD
	.get   ("/crud/task",     handle.task_list())
	.post  ("/crud/task",     handle.task_list())
	.get   ("/crud/task/:id", handle.)
	.patch ("/crud/task/:id", handle.)
	.put   ("/crud/task/:id", handle.)
	.delete("/crud/task/:id", handle.task_delete())

export { AUTH, CRUD };
