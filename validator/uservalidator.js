const validator = require('../validate');

const addUser = (req, res, next) => {
    const validationRule = {
        "firstname": "required|string",
        "lastname": "required|string",
        "mobile_number": "required|string",
        "email": "required|email",
        "gender": "required|string",
        "password": "required|string",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const login = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    addUser,
    login
}
