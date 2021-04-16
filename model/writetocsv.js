const pool = require("../config/database");

exports.write = function (data, callback) {
    pool.query("select * from users", (err, rows, fields) => {
        if (err) return callback(err);
        return callback(null, rows);
    })
}

