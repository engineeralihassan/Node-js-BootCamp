const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f76d2ce4b99829",
      pass: "7a12e6d3168b63"
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Jonas Schmedtmann <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;