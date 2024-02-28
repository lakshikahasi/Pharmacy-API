import sqlite3 from "sqlite3";

import { myDataSource as connection } from "../../data-source";

if (!process.env.SQLITE_PATH) {
  throw new Error("SQLITE_PATH environment variable is not set.");
}

export const connect = () =>
  connection
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
export { connection };
export const PrepareDB = () => new sqlite3.Database(":memory:");
