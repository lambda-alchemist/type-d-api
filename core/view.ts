import { type Context, send, BodyOptions, BodyJson } from "land:oak";
import { hash } from "land:bcrypt";
import { Status } from "std:status";
import * as Model from "mvc:model";

async function task_list(context: Context) {
	// const { page = 1, size = 10 } = Number(context.request.url.searchParams);
	const size = Number(context.request.url.searchParams.get("size")) || 10;
	const page = Number(context.request.url.searchParams.get("page")) || 1;
	const tasks = await Model.Task.limit(size).offset((size - 1) * page).all();
	const total = await Model.Task.count();
	context.response.status = Status.OK;
	context.response.body = {
		count: total,
		data: tasks,
	}
}

async function task_create(context: Context) {
	const { name } = await context.request.body("json").value;
	const task = await Model.Task.create({ name: name });
	task.save();
	context.response.status = Status.Created;
	context.response.body = {
		message: "Succefuly created Task",
		task: name
	}
}

async function task_retrieve(context: Context) {
	const { id } = await context.request.body("json").value;
	const task = await Model.Task.find(id)
	context.response.status = Status.OK;
	context.response.body = {
		message :"Succefully found Task",
		user: task
	};
}

async function task_delete(context: Context) {
	const { id } = await context.request.body("json").value;
	await Model.Task.deleteById(id);
	context.response.status = Status.OK;
	context.response.body = {
		message: "Succefully deleted task"
	};
}

async function user_create(context: Context) {
	const { name, password } = await context.request.body("json").value;
	const passhash = await hash(password);
	const user = await Model.User.create({ name: name, password: passhash })
	user.save;
	context.response.status = Status.Created;
	context.response.body = {
		message: "Succefully created User",
		user: name
	};
}

export {
	task_list,
	task_create,
	task_retrieve,
	task_update,
	task_modify,
	task_delete,
	user_create,
 };
