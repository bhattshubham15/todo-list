const userModel = require("../model/user");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

exports.createUser = function (req, res) {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Api to create user',
     * #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        type: 'string',
        schema: {
            $firstname:"firstname",
            $lastname:"lastname",
            $email:"email",
            $gender:"gender",
            $mobile_number: "7778889990",
            $password:"password",
        }
        },
    * #swagger.responses[200] = { description: 'Data inserted!' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    userModel.create(body, (err, results) => {
        if (err) {
            console.log(err);
            response.onError(body, err, req.originalUrl, req.user.id);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Data inserted!'
        });
    });
}

exports.updateUser = function (req, res) {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Api to update user',
     * #swagger.parameters['id'] = {in: 'params'},
     * #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        type: 'string',
        schema: {
            $firstname:"firstname",
            $lastname:"lastname",
            $email:"email",
            $gender:"gender",
            $mobile_number: "7778889990",
            $password:"password",
        }
        },
    * #swagger.responses[200] = { description: 'Updated successfully' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    const body = req.body;
    const { id } = req.params;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    body.id = id;
    userModel.update(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Failed to update"
            })
        }
        return res.json({
            success: 1,
            message: "Updated successfully"
        });
    });
}

exports.getUsers = function (req, res) {
    /**
     * #swagger.tags = ['User'],
     * #swagger.description = 'Api to get users',
     * #swagger.parameters['id'] = {in: 'params'},
     * #swagger.parameters['id'] = {
        in: 'params',
        required: false,
        },
    * #swagger.responses[200] = { description: 'Fetched successfully' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    const { id } = req.params;
    if (id) {
        req.id = id;
    }
    userModel.getUsers(req, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Fetched successfully',
            data: results
        });
    });
}

exports.deleteUser = function (req, res) {
    /**
     * #swagger.tags = ['User'],
     * #swagger.description = 'Api to delete user',
     * #swagger.parameters['id'] = {in: 'params'},
     * #swagger.responses[200] = { description: 'Deleted succesfully!' }
     * #swagger.responses[500] = { description: 'Server error' }
    */
    const { id } = req.params;
    userModel.deleteUser(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Deleted succesfully!'
        });
    });
}

exports.getCurrentUser = function (req, res) {
    /**
     * #swagger.tags = ['User'],
     * #swagger.description = 'Api to check current user on the basis of token',
     * #swagger.responses[200] = { description: 'User details fetched!' }
     * #swagger.responses[500] = { description: 'Server error' }
    */
    if (req.user && req.user.firstname && req.user.lastname) {
        return res.status(200).json(req.user);
    }
    return res.status(500).json({
        message: 'No user details available!'
    });
}