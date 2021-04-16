const todoModel = require("../model/todolist");

exports.createTodo = function (req, res) {
    /**
     * #swagger.tags = ['Todo']
     * #swagger.description = 'Api to create todo',
     * #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        type: 'string',
        schema: {
            $task_details: "Jogging",
            $todo_time: "2021-05-15 18:27:06",
            $status:  "completed"
        }
        },
    * #swagger.responses[200] = { description: 'Todo created!' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    req.body.user_id = req.user.id;
    todoModel.createTodo(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Todo created!'
        });
    })
}

exports.updateTodo = function (req, res) {
    /**
     * #swagger.tags = ['Todo']
     * #swagger.description = 'Api to update todo',
     * #swagger.parameters['id']= {in: 'body'},
     * #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        type: 'string',
        schema: {
            $task_details: "Jogging",
            $todo_time: "2021-05-15 18:27:06",
            $status:  "completed"
        }
        },
    * #swagger.responses[200] = { description: 'Todo updated!' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    req.body.id = req.params.id;
    req.body.user_id = req.user.id;
    todoModel.updateTodo(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Todo updated!'
        });
    })
}

exports.viewTodoList = function (req, res) {
    /**
     * #swagger.tags = ['Todo']
     * #swagger.description = 'Api to view todo list',
     * #swagger.responses[200] = { description: 'Todo list fetched!' }
     * #swagger.responses[500] = { description: 'Server error' }
    */
    req.body.user_id = req.user.id;
    todoModel.viewTodoList(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Todo list fetched!',
            data: result
        });
    })
}

exports.viewTodo = function (req, res) {
    /**
     * #swagger.tags = ['Todo']
     * #swagger.description = 'Api to view todo',
     * #swagger.parameters['id'] = {
        in: 'params',
        required: true
        },
    * #swagger.responses[200] = { description: 'Todo details fetched!' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    req.body.user_id = req.user.id;
    req.body.id = req.params.id;
    todoModel.viewTodo(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Todo details fetched!',
            data: result
        });
    })
}

exports.deleteTodo = function (req, res) {
    /**
     * #swagger.tags = ['Todo']
     * #swagger.description = 'Api to delete todo',
     * #swagger.parameters['id'] = {
        in: 'params',
        required: true
        },
    * #swagger.responses[200] = { description: 'Todo deleted!' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    req.body.user_id = req.user.id;
    req.body.id = req.params.id;
    todoModel.deleteTodo(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Todo deleted!',
        });
    })
}
