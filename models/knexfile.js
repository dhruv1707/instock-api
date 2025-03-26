import dotenv from "dotenv";

dotenv.config({path: "../.env"});

console.log('DB password', process.env.DB_PASSWORD);

export default {
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
}
