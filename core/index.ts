import * as Oak    from "land:oak";
import * as Color  from "std:color";
import * as Log    from "mvc:log";
import * as Router from "mvc:route";

const listen
	: { secure: boolean, hostname: string,      port: number }
	= { secure: false,   hostname: "localhost", port: 8800   }

const app = new Oak.Application();
app.use(Log.logger);
app.use(Log.time);
app.use(Log.json);
app.use(Router.crud.routes());
app.use(Router.auth.routes());
app.use(Router.crud.allowedMethods());
app.use(Router.auth.allowedMethods());
app.addEventListener(
	"listen", ({ secure, hostname, port }: typeof listen) => {
		const protocol = secure ? "https://" : "http://";
		const url = `${protocol}${hostname ?? "localhost"}:${port}`;
		console.log(`${Color.yellow("Listening on:")} ${Color.green(url)}`);
	}
);

await app.listen(listen);
