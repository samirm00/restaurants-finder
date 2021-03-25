const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};

/*

psql --host=ec2-54-161-239-198.compute-1.amazonaws.com --port=5432 --username=oonxsikiusxlvk --password --dbname=d48k11forn8qhq


*/
