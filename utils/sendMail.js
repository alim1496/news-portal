var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: 'marzia.aditi@gmail.com',
    pass: 'scientaficname+1000'
  },
  tls: {
    rejectUnauthorized: false
  },
  service: 'gmail'
});

const send = (fullname, receiver, code) => {
  const mailOptions = {
    from: 'marzia.aditi@gmail.com',
    to: receiver,
    subject: 'Account verification for News World',
    text: `Dear ${fullname}, Thank you for registering to News World. Your account verification code is ${code}.`
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });
};

module.exports = send;
