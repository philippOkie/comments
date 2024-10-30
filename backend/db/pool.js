const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "top_users",
  password: "12345",
  port: 5432
});