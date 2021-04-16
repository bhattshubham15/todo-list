const pool = require("../config/database");

exports.createTodo = function (data, callBack) {
    pool.query(`insert into todo_details(task_details,todo_time,status,user_id,updated_on) value(?,?,?,?,?)`,
        [
            data.task_details,
            data.todo_time,
            data.status,
            data.user_id,
            new Date()
        ],
        (err, results, field) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    );
}

exports.updateTodo = function (data, callBack) {
    pool.query(`update todo_details set task_details=?,todo_time=?,status=?,user_id=?,updated_on=? where id=?`,
        [
            data.task_details,
            data.todo_time,
            data.status,
            data.user_id,
            new Date(),
            data.id
        ],
        (err, results, field) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    );
}

exports.viewTodoList = function (data, callBack) {
    pool.query(`select id,task_details,todo_time,status,user_id,updated_on from todo_details`,
        (err, results, field) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        }
    );
}

exports.viewTodo = function (data, callBack) {
    pool.query(`select id,task_details,todo_time,status,user_id,updated_on from todo_details where id=? and user_id=?`,
        [
            data.id,
            data.user_id
        ],
        (err, results, field) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    );
}

exports.deleteTodo = function (data, callBack) {
    pool.query(`delete from todo_details where id=? and user_id=?`,
        [
            data.id,
            data.user_id
        ],
        (err, results, field) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results[0]);
        }
    );
}
