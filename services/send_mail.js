const nodemailer = require('nodemailer');

let sendMail = async (reqBody) => {
  const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3b4833d16eb378",
        pass: "78d26f4c86dfcf"
      }
    });
    

  let info = await transport.sendMail({
      from: reqBody.name,         // Sender
      to: "bar@example.com",      // list of receivers
      subject: reqBody.object,    // Subject line
      text: reqBody.message ,     // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}


module.exports = sendMail;