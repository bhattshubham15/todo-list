const pool = require("../config/database");

exports.create = function (data, callBack) {
    pool.query(`insert into users(firstname,lastname,gender,email,mobile_number,password,updated_on) value(?,?,?,?,?,?,?)`,
        [
            data.firstname,
            data.lastname,
            data.gender,
            data.email,
            data.mobile_number,
            data.password,
            new Date(),
        ],
        (err, results, field) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    );
}

exports.update = function (data, callBack) {
    pool.query(`update users set firstname=?,lastname=?,gender=?,email=?,mobile_number=?,password=?,updated_on=? where id=?`,
        [
            data.firstname,
            data.lastname,
            data.gender,
            data.email,
            data.mobile_number,
            data.password,
            new Date(),
            data.id,
        ],
        (err, results, field) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    );
}

exports.getUsers = function (req, callback) {
    let sql = "select id,firstname,lastname,gender,email,mobile_number,updated_on from users";
    if (req.id) {
        sql = "select id,firstname,lastname,gender,email,mobile_number,updated_on from users where id=?";
    }
    pool.query(sql, [req.id], (err, rows, fields) => {
        if (err) return callback(err);
        return callback(null, rows);
    })
}

exports.deleteUser = function (id, callback) {
    pool.query("delete from users where id=?", [id], (err, rows, fields) => {
        if (err) return callback(err);
        return callback(null, rows);
    })
}

exports.login = function (email, callback) {
    pool.query("select * from users where email=?", [email], (err, rows, fields) => {
        if (err) return callback(err);
        return callback(null, rows);
    })
}

exports.getCurrentUser = function (email, res) {
    pool.query("select id,firstname,lastname,gender,email,mobile_number,updated_on from users where email=?", [email], (err, rows, fields) => {
        if (err) throw err;
        return res.send(rows);
    })
}