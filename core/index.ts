import { Application } from "land:oak";
import * as Color from "std:color";
import * as Log from "mvc:log";
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
app.use(Log.logger)
app.use(Log.json_only)
app.use(Router.crud.routes());
app.use(Router.auth.routes());
app.use(Router.crud.allowedMethods());
app.use(Router.auth.allowedMethods());
app.addEventListener(
	"listen", ({ secure, hostname, port }: listen) => {
		const protocol = secure ? "https://" : "http://";
		const url = `${protocol}${hostname ?? "localhost"}:${port}`;
		console.log(`${Color.yellow("Listening on:")} ${Color.green(url)}`);
	}
);

await app.listen(localhost);
