import { Application, Context, Router } from "land:oak";
import { yellow, green } from "std:color";

const router = new Router();
const app = new Application();

const secure = true;
const hostname = 'localhost';
const port = 8800;

type listen = {
	secure:   boolean,
	hostname: string,
	port:     number
}

router
	.get("/", (context: Context) => context.response.body = "Welcome to the type-d-api")

app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener("listen", ({ secure, hostname, port }: listen) => {
	const protocol = secure ? "https://" : "http://";
	const url = `${protocol}${hostname ?? "localhost"}:${port}`;
	console.log(`${yellow("Listening on:")} ${green(url)}`);
});
await app.listen({ secure, hostname, port });
