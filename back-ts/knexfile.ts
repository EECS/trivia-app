// Update with your config settings.
import config from "./src/config/index";

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: config.postgres.host,
      database: config.postgres.dbName,
      user: config.postgres.user,
      password: config.postgres.password
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