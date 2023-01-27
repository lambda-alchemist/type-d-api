import { Application } from "land:oak";
import { yellow, green } from "std:color";
import { API } from "router/url.ts";

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

app.use(API.routes());
app.use(API.allowedMethods());
app.addEventListener("listen", ({ secure, hostname, port }: listen) => {
	const protocol = secure ? "https://" : "http://";
	const url = `${protocol}${hostname ?? "localhost"}:${port}`;
	console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen(localhost);
