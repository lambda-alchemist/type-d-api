import { Application, Context } from "land:oak";
import { yellow, green } from "std:color";
import * as Router from "mvc:route";

type listen = {
	secure:   boolean,
	hostname: string,
	port:     number
}

const localhost: listen = {
	secure:   false,
	hostname: "localhost",
	port:     8800
}

const app = new Application();

app.use(Router.crud.routes());
app.use(Router.auth.routes());
app.use(Router.crud.allowedMethods());
app.use(Router.auth.allowedMethods());
app.use(
	async(context: Context, next: Function) => {
		await next();
		const response_time = context.response.headers.get("X-Response-Time");
		console.log(`${context.request.method} ${context.request.url} - ${response_time}`);
	}
)
app.addEventListener(
	"listen", ({ secure, hostname, port }: listen) => {
		const protocol = secure ? "https://" : "http://";
		const url = `${protocol}${hostname ?? "localhost"}:${port}`;
		console.log(`${yellow("Listening on:")} ${green(url)}`);
	}
);

await app.listen(localhost);
