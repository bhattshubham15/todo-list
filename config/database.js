const { createPool } = require('mysql');
require("dotenv").config();

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: process.env.DB_CONNECTIONLIMIT
});

pool.getConnection(function (err, connection) {
    if (err) {
        return cb(err);
    } else {
        console.log('db connected!');
    }
});

module.exports = pool;
