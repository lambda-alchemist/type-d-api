import { Application } from "land:oak";
import { yellow, green } from "std:color";
import { CRUD } from "./routes.ts";

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

app.use(CRUD.routes());
app.use(CRUD.allowedMethods());
app.addEventListener(
	"listen", ({ secure, hostname, port }: listen) => {
		const protocol = secure ? "https://" : "http://";
		const url = `${protocol}${hostname ?? "localhost"}:${port}`;
		console.log(`${yellow("Listening on:")} ${green(url)}`);
	}
);

await app.listen(localhost);
