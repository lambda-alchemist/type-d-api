import * as Oak    from "land:oak";
import * as bcrypt from "land:bcrypt";
import * as HTTP   from "std:status";
import * as Model  from "api:model";

const json: Oak.BodyOptions<"json"> = { type: "json" };

export async function user_list(context: Oak.Context) {
	const size = Number(context.request.url.searchParams.get("size")) || 10;
	const page = Number(context.request.url.searchParams.get("page")) || 1;
	const data = await Model.User.offset((size - 1) * page).limit(size).get();
	const total = await Model.User.count();
	context.response.body = {
		message: "Succefully listed users",
		count: total,
		data: data,
	}
}

export async function user_create(context: Oak.Context) {
	const { email, username, password } = await context.request.body(json).value;
	const uuid = crypto.randomUUID()
	const hash = await bcrypt.hash(password);
	const user = new Model.User();
		user.uuid     = uuid,
		user.email    = email,
		user.username = username,
		user.password = hash
	await user.save();
	context.response.status = HTTP.Status.Created;
	context.response.body = {
		message: "Succefully created User",
		user: user
	};
}

export async function user_retrieve(context: Oak.Context) {
	const { id } = await context.request.body(json).value;
	const user = await Model.User.find(id);
	context.response.body = {
		message : "Succefully found user",
		record: user
	};
}

export async function user_update(context: Oak.Context) {
	const { put } = await context.request.body(json).value;
	const c = await Model.User.where( "id", put.id ).update(put);
	context.response.body = {
		message: "Succefully updated user",
		put: put,
		c: c
	};
}

export async function user_modify(context: Oak.Context) {
	const { id, patch } = await context.request.body(json).value;
	await Model.User.where("id", id).update(patch);
	context.response.body = {
		message: "Succefully modified user"
	};
}

export async function user_delete(context: Oak.Context) {
	const { id } = await context.request.body(json).value;
	await Model.User.deleteById(id);
	context.response.body = {
		message: "Succefully deleted user"
	};
}

export async function task_list(context: Oak.Context) {
	const size = Number(context.request.url.searchParams.get("size")) || 10;
	const page = Number(context.request.url.searchParams.get("page")) || 1;
	const data = await Model.User.offset((size - 1) * page).limit(size).get();
	const total = await Model.User.count();
	context.response.body = {
		message: "Succefully listed tasks",
		count: total,
		data: data,
	}
}

export async function task_create(context: Oak.Context) {
	const { name } = await context.request.body(json).value;
	const uuid = crypto.randomUUID();
	const stat = false;
	const date = new Date();
	const task = new Model.Task();
		task.uuid         = uuid;
		task.title        = name;
		task.completed    = stat;
		task.completed_at = null;
		task.due_date     = date;
	await task.save();
	context.response.status = HTTP.Status.Created;
	context.response.body = {
		message: "Succefully created task",
		record: task
	};
}

export async function task_retrieve(context: Oak.Context) {
	const { id } = await context.request.body(json).value;
	const task = await Model.Task.find(id);
	context.response.body = {
		message : "Succefully found task",
		record: task
	};
}

export async function task_update(context: Oak.Context) {
	const { put } = await context.request.body(json).value;
	const c = await Model.Task.where( "id", put.id ).update(put);
	context.response.body = {
		message: "Succefully updated task",
		put: put,
		c: c
	};
}

export async function task_modify(context: Oak.Context) {
	const { id, patch } = await context.request.body(json).value;
	await Model.Task.where("id", id).update(patch);
	context.response.body = {
		message: "Succefully modified task"
	};
}

export async function task_delete(context: Oak.Context) {
	const { id } = await context.request.body(json).value;
	await Model.Task.deleteById(id);
	context.response.body = {
		message: "Succefully deleted task"
	};
}
