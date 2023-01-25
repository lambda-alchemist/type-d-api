import { Application, Context, Router } from "land:oak";
import { yellow, green } from "std:color";

type listen = {
	secure:   boolean,
	hostname: string,
	port:     number
}

const localhost = {
	secure:   false,
	hostname: "localhost",
	port:     8800
}

const router = new Router();
const app = new Application();

router
	.get("/", (context: Context) => context.response.body = "Welcome to the type-d-api")

app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener("listen", ({ secure, hostname, port }: listen) => {
	const protocol = secure ? "https://" : "http://";
	const url = `${protocol}${hostname ?? "localhost"}:${port}`;
	console.log(`${yellow("Listening on:")} ${green(url)}`);
});
await app.listen(localhost);
