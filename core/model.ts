import { Database, DataTypes, Model } from "land:denodb";

const db = new Database(
	"sqlite3",
	{ filepath: "./db.sqlite" }
);

class User extends Model {
	static table = "User";
	static timestamps = true;
	static fields = {
		id:       DataTypes.UUID,
		name:     DataTypes.string(255),
		password: DataTypes.TEXT
	};
	static tasks() {
		return this.hasMany(Task);
	}
}

class Task extends Model {
	static table = "Task";
	static timestamp = true;
	static fields = {
		id:     DataTypes.UUID,
		name:   DataTypes.string(63),
		status: DataTypes.BOOLEAN
	};
	static defaults = {
		status: false
	}
	static users() {
		return this.hasOne(User);
	}
}

db.link([User, Task]);
await db.sync({ drop: true });
export { User, Task };
