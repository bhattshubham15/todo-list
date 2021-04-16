const nodemailer = require('nodemailer');
require("dotenv").config();

var transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp-relay.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.E_PASSWORD
    },
    secure: true
});

exports.sendMail = async function (to_email) {
    let body = {
        from: '"Todo 👻" <noreply@todo.com>', // sender address
        to: to_email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }
    await transporter.sendMail(body, function (err, info) {
        if (err) {
            console.log(err, 'error occured');
        }
        if (info) {
            console.log(info, 'info here');
        }
    });
}
