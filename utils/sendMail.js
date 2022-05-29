var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'news44092@gmail.com',
    pass: 'strong1234news'
  }
});

var mailOptions = {
  from: 'news44092@gmail.com',
  to: 'marzia.aditi@gmail.com',
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
