// Update with your config settings.
import dotenv from "dotenv";

dotenv.config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST,
      database: process.env.PG_DB,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/src/db/migrations"
    },
    seeds: {
      directory: __dirname + "/src/db/seeds"
    }
  },
};