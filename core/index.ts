import * as Color   from "std:color";
import * as Oak     from "land:oak";
import * as Utility from "self:utils";
import * as Router  from "self:route";

const listen
	: { secure: boolean, hostname: string,      port: number }
	= { secure: false,   hostname: "localhost", port: 8800   }

const app = new Oak.Application();
app.use(Utility.logger);
app.use(Utility.json);
app.use(Router.router.routes());
app.use(Router.router.allowedMethods());
app.addEventListener(
	"listen", ({ secure, hostname, port }: typeof listen) => {
		const protocol = secure ? "https://" : "http://";
		const url = `${protocol}${hostname ?? "localhost"}:${port}`;
		console.log(`${Color.yellow("Listening on:")} ${Color.green(url)}`);
	}
);

await app.listen(listen);
