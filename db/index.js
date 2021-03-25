const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.GP_DATABASE,
  port: process.env.PG_PORT,
};
const proConfig = {
  connectionString:
    "postgres://oonxsikiusxlvk:6117d33bc1503226e740e7680dc84c43104afea4969f9ab3467481acc302d945@ec2-54-161-239-198.compute-1.amazonaws.com:5432/d48k11forn8qhq",
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
