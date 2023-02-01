import { Context } from "land:oak";
import { hash } from "land:bcrypt";
import { Status } from "std:status";
import * as Model from "mvc:model";

async function task_list(context: Context) {
	// const { page = 1, size = 10 } = Number(context.request.url.searchParams);
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

async function task_create(context: Context) {
	const { name } = await context.request.body().value;
	const task = await Model.Task.create({ name: name });
	task.save();
	context.response.status = Status.Created;
	context.response.body = {
		message: "Succefully created task",
		record: task
	}
}

async function task_retrieve(context: Context) {
	const { id } = await context.request.body().value;
	const task = await Model.Task.find(id)
	context.response.body = {
		message : "Succefully found task",
		record: task
	};
}

async function task_update(context: Context) {
	const { put } = await context.request.body().value;
	const c = await Model.Task.where( "id", put.id).update(put);
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
	const { id }: { id: string } = await context.request.body().value;
	await Model.Task.deleteById(id);
	context.response.body = {
		message: "Succefully deleted task"
	};
}

async function user_create(context: Context) {
	const { name, password }: { name: string, password: string} = await context.request.body().value;
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
