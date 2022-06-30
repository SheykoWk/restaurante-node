const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
          user: "test.academlo@gmail.com", //todo: deben ser una variable de entorno
          pass: "yxyhldizcchtsfmj"
        }
});

module.exports = {
    transporter
}
