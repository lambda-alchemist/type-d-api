import * as ORM from "land:denodb";

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
		return this.hasMany(Task);
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

db.link([User, Task]);
await db.sync();
export { User, Task };
