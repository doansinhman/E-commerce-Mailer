var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'e.commerce.211.hcmut@gmail.com',
    pass: '12345sau'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {isError: false, message: ''});
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  var mailOptions = {
    from: 'e.commerce.211.hcmut@gmail.com',
    to: req.body.email,
    subject: req.body.subject,
  };

  if (req.body.type == 'raw') {
    mailOptions.text = req.body.content;
  } else {
    mailOptions.html == req.body.content;
  }
  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

    let option = {};
    option.isError = error != null;
    if (option.isError) {
      option.message = str(error);
    } else {
      option.message = info.response;
    }
    res.render('index', option)
  });
});

module.exports = router;
