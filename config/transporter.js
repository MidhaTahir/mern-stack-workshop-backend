const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  // port: 587, // change to 465 in production
  // secure: false, //change to true in production
  port: 587,
  secure: false,
  auth: {
    user: "info@getweys.com",
    pass: "h}ga&n~Rcy8p",
  },
});

module.exports = transporter;
