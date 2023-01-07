// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require("dotenv").config();

module.exports = {
  client: "postgresql",
  connection: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB || "test_db",
    user: process.env.POSTGRES_USER || "user",
    password: process.env.PASSWORD || "null",
    port: process.env.PORT || "null",
    charset: "utf8",
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};