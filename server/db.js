const Pool = require("pg").Pool; // allows to configure our connection with db

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "coffeehouse",
  port: 5432,
  database: "noderegistration"
});

module.exports = pool;