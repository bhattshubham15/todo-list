var logger = require("../config/logger");

exports.onError = (req, res, url, user_id) => {
    let body = {
        request: req,
        response: res,
        url,
        user_id,
        date: new Date()
    };
    logger.logInsert(body).then((result) => {
        console.log(result);
    }).catch(error => console.log(error));
};
