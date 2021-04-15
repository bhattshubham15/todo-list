const jwt = require('jsonwebtoken');
require("dotenv").config();
const userModel = require("../model/user");


exports.generateAccessToken = function (email) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)
        
        req.user = user
    })
    userModel.login(req.user.email, (err, result) => {
        if (result && result.length != 0) {
            req.user.id = result[0].id;
            req.user.firstname = result[0].firstname;
            req.user.lastname = result[0].lastname;
            req.user.gender = result[0].gender;
            req.user.email = result[0].email;
            req.user.mobile_number = result[0].mobile_number;
            req.user.updated_on = result[0].updated_on;
        }
        next()
    })
}
