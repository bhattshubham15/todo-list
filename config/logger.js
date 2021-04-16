const pool = require("../config/database");

exports.logInsert = (body) => {
    let sql = "INSERT INTO logs (request, response, url, updated_on, user_id) VALUES (?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        pool.query(sql, [JSON.stringify(body.request), JSON.stringify(body.response), body.url, body.date, body.user_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
