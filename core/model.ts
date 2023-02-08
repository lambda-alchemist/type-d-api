import * as ORM from "land:denodb";
import * as Zod from "land:zod";

const sqlite = new ORM.SQLite3Connector({ filepath: './db.sqlite3' });
const db = new ORM.Database(sqlite);

class User extends ORM.Model {
	static table = "User";
	static timestamps = true;
	static fields = {
		uuid: { type: ORM.DataTypes.UUID,   primaryKey: true },
		name: { type: ORM.DataTypes.STRING, length: 63 },
		mail: { type: ORM.DataTypes.STRING, length: 255 },
		pass: { type: ORM.DataTypes.TEXT }
	};
	static tasks() {
		return this.hasMany(User);
	}
}

class Task extends ORM.Model {
	static table = "Task";
	static timestamps = true;
	static fields = {
		uuid: { type: ORM.DataTypes.UUID,   primaryKey: true },
		name: { type: ORM.DataTypes.STRING, length: 127 },
		stat: { type: ORM.DataTypes.BOOLEAN }
	};
	static user() {
		return this.hasOne(User);
	}
}

const invalid_uuid = { message: "Invalid UUID format, make sure your UUID string is." };
const invalid_name = { message: "Username must be atleast 8 characters long." };
const invalid_pass = { message: "Password must be atleast 12 characters long." };
const invalid_mail = { message: "Invalid email address inserted, make sure your email is correct." }

const UserSchemaFull = Zod.object({
	uuid: Zod.string().uuid(invalid_uuid),
	name: Zod.string().min(8, invalid_name),
	mail: Zod.string().email(invalid_mail),
	pass: Zod.string().min(12, invalid_pass)
});

const UserSignUp = ({
	name: Zod.string().min(8, invalid_name),
	mail: Zod.string().email(invalid_mail),
	pass: Zod.string().min(8, invalid_pass)
})

const TaskSchemaFull = Zod.z.object({
	uuid: Zod.string().uuid(invalid_uuid),
	name: Zod.string().min(8, invalid_name),
	mail: Zod.string().email(invalid_mail),
	stat: Zod.boolean().default(false)
});

db.link([User, Task]);
await db.sync();
export {
	User,
	Task,
	UserSchemaFull,
	TaskSchemaFull
};
