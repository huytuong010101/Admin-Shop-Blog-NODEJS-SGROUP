require('dotenv').config()
connect = "mysql://" 
          + process.env.DB_USER + ":" 
          + process.env.DB_PASS + "@"
          + process.env.DB_HOST + ":"
          + process.env.DB_PORT + "/admin"
module.exports = {
  development: {
    client: "mysql",
    connection: connect,
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },
  production: {
    client: "mysql",
    connection: connect,
  },
};