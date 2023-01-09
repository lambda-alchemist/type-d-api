import { Router } from "oak"
import * as hand from "./handler.ts"

const router = new Router()

router
	.get("/user", hand.user_list)
	.post("/user", hand.user_create)
	.get("/user:id", hand.user_retrieve)
	.patch("/user/:id", hand.user_update)
	.delete("/user/:id", hand.user_remove)
