require('dotenv').config()
connect = "mysql://"
  + process.env.DB_USER + ":"
  + process.env.DB_PASS + "@"
  + process.env.DB_HOST + ":"
  + process.env.DB_PORT + "/"
  + process.env.DB_NAME
module.exports = {
  development: {
    client: "mysql",
    connection: connect,
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
    seeds: {
      directory: __dirname + "/knex/seeds",
    },
  },
  production: {
    client: "mysql",
    connection: connect,
  },
};