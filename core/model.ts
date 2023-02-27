import * as ORM from "land:denodb";

const sqlite = new ORM.SQLite3Connector({ filepath: './db.sqlite3' });
const db = new ORM.Database(sqlite);

class User extends ORM.Model {
	static table = "User";
	static timestamps = true;
	static fields = {
		uuid:     { type: ORM.DataTypes.UUID,   primaryKey: true },
		email:    { type: ORM.DataTypes.STRING, length: 255, unique: true },
		username: { type: ORM.DataTypes.STRING, length: 63 },
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
		uuid:         { type: ORM.DataTypes.UUID,     primaryKey: true },
		// owner:        { type: ORM.DataTypes.UUID,    foreignKey: true },
		title:        { type: ORM.DataTypes.STRING,   length: 127 },
		completed:    { type: ORM.DataTypes.BOOLEAN   },
		completed_at: { type: ORM.DataTypes.DATETIME, allowNull: true },
		due_date:     { type: ORM.DataTypes.DATETIME  }
	};
	static owner() {
		return this.hasOne(User);
	}
}

type SchemaUserSignUp = {
	username: string,
	email: string,
	password: string
}

type SchemaUserLogIn = {
	email: string,
	password: string
}

db.link([User, Task]);
await db.sync({ drop: true });
export {
	User,
	Task,
	type SchemaUserSignUp,
	type SchemaUserLogIn
};
