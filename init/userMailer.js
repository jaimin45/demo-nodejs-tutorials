const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  secure: true,

  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = { transporter };
