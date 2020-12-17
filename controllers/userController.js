
const User = require('../models/index.js').User
const Song = require('../models/index.js').Song
const UserSong = require('../models/index.js').UserSong
const { comparePassword } = require('../helpers/hashPassword.js')

const nodemailer = require('nodemailer');


class UserController{
  static showBio(req, res){
    User.findOne({
      where: {id : req.session.userId}
    })
    .then(data => {
      res.render('bio', {bio : data})
    })
  }

  static formRegister(req,res){
    res.render('formRegister')
  }

  static registerUser(req,res){
    let userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      age: req.body.age
    }
    User.create(userData)
    .then(data => {
      res.redirect('/home')
    })
    .catch(err => {
      res.send(err.message)
    })
  }

  static showLoginForm(req, res){
    res.render('loginForm')
  }

  static userLogin(req,res){
    let {email, password} = req.body
    User.findOne({
      where: {email}
    })
    .then(data => {
      if(data && comparePassword(password, data.password)){
        req.session.userId = data.id
        req.session.email = email
        console.log(req.session, ' ini req seesion')
        res.redirect('/home')
      } else {
        res.send('email atau password salah')
      }
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  static userLogout(req, res){
    delete req.session.email
    res.redirect('/users/login')
  }
  static showHome(req, res){
    res.render('first')
  }
  static seeFollow(req, res){
    User.findOne({
      where : {id : req.session.userId},
      include: [Song]
    })
    .then(data => {
      res.render('list-songFollowedByUser', {songs : data})
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  static feedbackForm(req, res){
    res.render('feedback')
  }
  static sendFeedback(req, res){
    let feedback = req.body.feedback
    let email = req.session.email

    nodemailer.createTestAccount((err, account) => {
      if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
      }
      console.log('Credentials obtained, sending message...');
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'margarita.zboncak@ethereal.email',
            pass: '3BASX7mCKkkyUP6DyW'
        }
    });
      let message = {
          from: `Sender Name <${email}>`,
          to: 'Recipient <recipient@example.com>',
          subject: 'Feedback ✔',
          text: feedback,
      };
  
      transporter.sendMail(message, (err, info) => {
          if (err) {
              console.log('Error occurred. ' + err.message);
              return process.exit(1);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
  });
  }
}

module.exports = UserController