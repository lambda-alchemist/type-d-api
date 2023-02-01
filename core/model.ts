import { Database, DataTypes, Model, SQLite3Connector } from "land:denodb";

const sql = new SQLite3Connector({ filepath: './db.sqlite3' });
const db = new Database(sql);

class User extends Model {
	static table = "User";
	static timestamps = true;
	static fields = {
		id:       { type: DataTypes.UUID, primaryKey: true },
		name:     DataTypes.string(255),
		password: DataTypes.TEXT
	};
	static tasks() {
		return this.hasMany(Task);
	}
}

class Task extends Model {
	static table = "Task";
	static timestamps = true;
	static fields = {
		id:     { type: DataTypes.UUID, primaryKey: true },
		name:   DataTypes.string(63),
		status: DataTypes.BOOLEAN
	};
	static user() {
		return this.hasOne(User);
	}
}

db.link([User, Task]);
await db.sync();
export { User, Task };
