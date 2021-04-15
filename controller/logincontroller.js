const userModel = require("../model/user");
const authMiddleware = require("../middleware/authmiddleware");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

exports.login = function (req, res) {
    /**
     * #swagger.tags = ['Login']
     * #swagger.description = 'Api to login',
     * #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        type: 'string',
        schema: {
            $email:"shubhambhatt@gmail.com",
            $password:"Abc@123",
        }
        },
    * #swagger.responses[200] = { description: 'Token generated' }
    * #swagger.responses[500] = { description: 'Server error' }
    */
    const body = req.body;
    userModel.login(body.email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database connection error"
            })
        }
        if (results.length == 0) {
            return res.status(500).json({
                message: "Invalid details!",
            })
        }
        const result = compareSync(body.password, results[0].password);
        if (result) {
            const token = authMiddleware.generateAccessToken(body.email);
            return res.status(200).json({
                message: "Token generated successfully!",
                token,
            })
        } else {
            return res.status(500).json({
                message: "Invalid details!"
            })
        }
    });
}
