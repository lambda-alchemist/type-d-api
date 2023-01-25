import { Prisma, PrismaClient } from "edge_client";
import { loadSync } from "std:dotenv";
import { hashSync } from "land:bcrypt";

const env = loadSync();
const prisma = new PrismaClient({ datasources:{ db:{ url: env.PRISMA_URL}}});

async function main(){
	const hashed_pass = hashSync(env.PASSWORD);
	const seedUser: Prisma.UserCreateInput = {
		id: crypto.randomUUID().toString(),
		username: "lambda",
		email: "alchemist.software@proton.me",
		password: hashed_pass,
		task: {
			create: [
				{ id: crypto.randomUUID().toString(), name: "Task 1" },
				{ id: crypto.randomUUID().toString(), name: "Task 2" },
				{ id: crypto.randomUUID().toString(), name: "Task 3" }
			]
		}
	};
	await prisma.user.create({data: seedUser});
}

main().finally(
	async () => { await prisma.$disconnect}
);
