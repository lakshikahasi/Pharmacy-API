require("dotenv/config");

import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  name: "default",
  type: "sqlite",
  database: "./database.db",
  entities: ["src/models/**/*{.js,.ts}"],
  migrations: ["src/migrations/**/*{.js,.ts}"],
  logging: true,
  synchronize: false,
});
