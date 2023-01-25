import { Database, SQLite3Connector } from "land:denodb"

const conn = new SQLite3Connector({	filepath: "./sql.db" });
const db = new Database(conn);
