import { Router } from "oak"
import * as hand from "./handler.ts"

const router = new Router()

router
	.get("/user", hand.task_list)
	.post("/user", hand.task_create)
	.get("/user:id", hand.task_retrieve)
	.patch("/user/:id", hand.task_update)
	.delete("/user/:id", hand.task_remove)
