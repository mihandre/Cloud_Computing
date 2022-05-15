const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (receiver, sender, msg, subject) => {
  const msgToSend = {
    to: receiver,
    from: sender,
    subject,
    text: msg,
  };

  sgMail
    .send(msgToSend)
    .then((res) => {
      console.log(res[0].statusCode);
      return res[0].statusCode;
    })
    .catch((err) => {
      console.log(err);
      return 500;
    });
};

module.exports = {
  sendMail,
};
