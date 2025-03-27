import dotenv from "dotenv";
import knex from "knex";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env")});

console.log('DB password', process.env.DB_PASSWORD);

export default knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1", 
    user: "instock",
    password: process.env.DB_PASSWORD,
    database: "instock_DB",
    charset: "utf8"
  },
  migrations: {
    directory: './migrations'
  },
  seed: {
    directory: './seed'
  }
})

console.log("DB connected");