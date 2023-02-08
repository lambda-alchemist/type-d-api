import * as ORM from "land:denodb";
import * as Zod from "land:zod";

const sqlite = new ORM.SQLite3Connector({ filepath: './db.sqlite3' });
const db = new ORM.Database(sqlite);

class User extends ORM.Model {
	static table = "User";
	static timestamps = true;
	static fields = {
		id:       { type: ORM.DataTypes.UUID,   primaryKey: true },
		name:     { type: ORM.DataTypes.STRING, length: 255 },
		password: { type: ORM.DataTypes.TEXT }
	};
	static tasks() {
		return this.hasMany(User);
	}
}

class Task extends ORM.Model {
	static table = "Task";
	static timestamps = true;
	static fields = {
		id:     { type: ORM.DataTypes.UUID,   primaryKey: true },
		name:   { type: ORM.DataTypes.STRING, length: 63 },
		status: { type: ORM.DataTypes.BOOLEAN }
	};
	static user() {
		return this.hasOne(User);
	}
}

const user_schema = Zod.z.object({
	uuid: Zod.string()
	         .uuid({ message: "Invalid UUID format, make sure your UUID string is " }),
	name: Zod.string()
	         .min( 8, { message: "Username must be atleast 8 characters long." }),
	pass: Zod.string()
	         .min(12, { message: "Password must be atleast 12 characters long." })
});

const task_schema = Zod.z.object({
	uuid: Zod.string().uuid(),
	name: Zod.string(),
	stat: Zod.boolean()
});

db.link([User, Task]);
await db.sync();
export {
	User,
	Task,
	user_schema,
	task_schema
};
