import { PrismaClient } from "edge_client"
import { loadSync } from "dotenv"
import { Context } from "oak"

const env = loadSync()
const prisma = new PrismaClient({
	datasources: {
		db: {
			url: env.DATABASE_URL
		}
	}
})

async function task_list(context: Context) {
	context.response.body = await prisma.task.findMany
}

async function task_create(context: Context) {
	const data = context.request.
}

async function task_retrieve(context: Context) {
	const { id } = context.params;
	context.response.body = await prisma.task.findUnique(
		{ where: { id: Number = id } }
	)
}

export {
	task_list,
	task_create,
	task_retrieve,
	task_update,
	task_remove
}
