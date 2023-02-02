import { Context } from "land:oak";
import * as bcrypt from "land:bcrypt";
import * as HTTP from "std:status";
import * as Model from "mvc:model";

async function task_list(context: Context) {
	const size = Number(context.request.url.searchParams.get("size")) || 10;
	const page = Number(context.request.url.searchParams.get("page")) || 1;
	const tasks = await Model.Task.limit(size).offset((size - 1) * page).all();
	const total = await Model.Task.count();
	context.response.body = {
		message: "Succefully listed tasks",
		count: total,
		data: tasks,
	}
}

async function user_create(context: Context) {
	const { name, password } = await context.request.body().value;
	const uuid = crypto.randomUUID()
	const hash = await bcrypt.hash(password);
	const user = new Model.User();
		user.id       = uuid,
		user.name     = name,
		user.password = hash
	await user.save();
	context.response.status = HTTP.Status.Created;
	context.response.body = {
		message: "Succefully created User",
		user: user
	};
}

async function task_create(context: Context) {
	const { name } = await context.request.body().value;
	const uuid = crypto.randomUUID();
	const task = new Model.Task();
		task.id     = uuid;
		task.name   = name;
		task.status = false;
	await task.save();
	context.response.status = HTTP.Status.Created;
	context.response.body = {
		message: "Succefully created task",
		record: task
	};
}

async function task_retrieve(context: Context) {
	const { id } = await context.request.body().value;
	const task = await Model.Task.find(id);
	context.response.body = {
		message : "Succefully found task",
		record: task
	};
}

async function task_update(context: Context) {
	const { put } = await context.request.body().value;
	const c = await Model.Task.where( "id", put.id ).update(put);
	context.response.body = {
		message: "Succefully updated task",
		put: put,
		c: c
	};
}

async function task_modify(context: Context) {
	const { id, patch } = await context.request.body().value;
	await Model.Task.where("id", id).update(patch);
	context.response.body = {
		message: "Succefully modified task"
	};
}
async function task_delete(context: Context) {
	const { id } = await context.request.body().value;
	await Model.Task.deleteById(id);
	context.response.body = {
		message: "Succefully deleted task"
	};
}

async function user_list(context: Context) {
	const size = Number(context.request.url.searchParams.get("size")) || 10;
	const page = Number(context.request.url.searchParams.get("page")) || 1;
	const tasks = await Model.User.offset(page).limit(size).all();
	const total = await Model.User.count();
	context.response.body = {
		message: "Succefully listed users",
		count: total,
		data: tasks,
	}
}

export {
	task_list,
	task_create,
	task_retrieve,
	task_update,
	task_modify,
	task_delete,
	user_list,
	user_create,
	// user_retrieve,
	// user_update,
	// user_modify,
	// user_delete
 };
