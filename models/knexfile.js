import dotenv from "dotenv";

dotenv.config();

// remove the knex fx() and export as object instead
export default {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    database: "instock",
    user: "root",
    password: "rootroot",
    charset: "utf8",
  },
};