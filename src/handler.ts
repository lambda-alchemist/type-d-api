import { loadSync } from "std:dotenv";

import { PrismaClient } from "edge_client";

const env = loadSync();
const prisma = new PrismaClient({datasources:{db:{url: env.PRISMA_URL}}});



export default {}
