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
    from: '"Làng Sách" <e.commerce.211.hcmut@gmail.com>',
    to: req.body.email.split(',').map(mail => mail.trim()),
    subject: req.body.subject,
  };

  if (req.body.cc) {
    mailOptions.cc = req.body.cc.split(',').map(mail => mail.trim());
  }
  if (req.body.bcc) {
    mailOptions.bcc = req.body.bcc.split(',').map(mail => mail.trim());
  }

  if (!req.body.type || req.body.type == 'raw') {
    mailOptions.text = req.body.content;
  } else {
    mailOptions.text = req.body.content.replace(/<[^>]*>?/gm, '');
    mailOptions.html = req.body.content;
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

    if (error) {
      res.json(error);
    } else {
      res.json(info.response);
    }
  });
});

module.exports = router;
