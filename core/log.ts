import { Middleware } from "land:oak";
import {
	red,
	yellow,
	green,
	cyan
} from "std:color";

const log: Middleware = async (request: any, response: any, next: Function) => {
	await next();
	const status = response.status;
	const text = `${status}`
	console.log(text);
}

export default log;
