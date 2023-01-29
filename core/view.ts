import { Context, send } from "land:oak";
import { hash } from "land:bcrypt";
import { Status } from "std:status";
import * as ORM from "./model.ts";

async function task_create(context: Context) {
	const { name, password } = context.request.body("json");
	const passhash = await hash(password);
	const user = await ORM.User.create({name, passhash})
	user.save;
	context.response.status = Status.Created;
	context.response.body = {
		name: name
	}
}

async function task_list(context: Context) {
	// const { page = 1, size = 10 } = Number(context.request.url.searchParams);
	const size = Number(context.request.url.searchParams.get("size")) || 10;
	const page = Number(context.request.url.searchParams.get("page")) || 1;
	const tasks = await ORM.Task.limit(size).offset((size - 1) * page).all();
	const total = await ORM.Task.count();
	context.response.status = Status.OK;
	context.response.body = {
		count: total,
		data: tasks,
	}
}

async function task_delete(context: Context) {
	const id = context.request.body("json");
	await ORM.Task.deleteById(id);
}


export {
	task_list,
	task_create,
	task_delete
 };
