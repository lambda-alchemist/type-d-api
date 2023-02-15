import * as ORM from "land:denodb";

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

type SchemaUserSignUp = {
	username: string,
	email: string,
	password: string
}

db.link([User, Task]);
await db.sync({ drop: true });
export {
	User,
	Task,
	type SchemaUserSignUp
};
