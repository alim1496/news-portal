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

var mailOptions = {
  from: 'marzia.aditi@gmail.com',
  to: 'alim1496@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const send = () => {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = send;
