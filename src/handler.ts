import { PrismaClient } from "edge_client"
import { loadSync } from "dotenv"

const env = loadSync()
const prisma = new PrismaClient({
	datasources: {
		db: {
			url: env.DATABASE_URL
		}
	}
})

async function user_list(context: any) {
	context.response.body = await prisma.user.findMany
}

async function user_retrieve(context: any) {
	const { id } = context.params;
	context.response.body = await prisma.user.findUnique(
		{ where: { id: Number = id } }
	)
}

export {
	user_list,
	user_retrieve,
}
