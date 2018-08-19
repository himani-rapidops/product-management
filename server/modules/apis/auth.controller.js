const UserModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto').randomBytes(256).toString('hex');

class AuthController {
  constructor(app) {
    app.post('/login', this.login);
  }

  login(req, res) {
    if (!req.body.Email) {
      return res.send({success: false, message: 'please provide email'});
    }
    if (!req.body.Password) {
      return res.send({success: false, message: 'please provide password'});
    }
    let emailAddress = req.body.Email.toLowerCase();
    let password = req.body.Password;
    new UserModel().user.findOne({Email: emailAddress})
      .then((user) => {
        if (!user) {
          return res.send({success: false, message: 'User not found.'});
        }
        if (password !== user.Password) {
          return res.send({success: false, message: 'Password invalid'});
        }
        return user;
      })
      .then((user) => {
        const token = jwt.sign({userId: user._id}, crypto, {expiresIn: '24h'});
        res.send({
          success: true,
          message: 'Login Successful!',
          token: token,
          user: user
        });
      }).catch((e) => {
      res.send({success: false, Error: e, message: "Error while logging user."});
    })
  }
}

module.exports = AuthController;


