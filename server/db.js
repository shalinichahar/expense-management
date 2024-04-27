const Pool = require("pg").Pool; // allows to configure our connection with db

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Coffeehouse29",
  port: 5432,
  database: "noderegistration"
});

module.exports = pool;