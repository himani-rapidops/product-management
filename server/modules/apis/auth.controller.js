const UserModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto').randomBytes(256).toString('hex');

class AuthController {
  constructor(app) {
    app.post('/login', this.login);
    app.post('/register', this.register);

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
    UserModel.findOne({Email: emailAddress})
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

  register(req, res) {
    console.log(req)
    if (!req.body.Email) {
      return res.send({success: false, message: 'please provide email'});
    }
    if (!req.body.Password) {
      return res.json({success: false, message: 'please provide password'});
    }

    let newUser = new UserModel({
      Email: req.body.Email.toLowerCase(),
      Password: req.body.Password
    });

    UserModel.findOne({Email: newUser.Email})
      .then((user) => {
        if (user) {
          return res.send({success: false, message: " User already Exist."});
        }
        return newUser;
      })
      .then((user) => {
        return user.save();
      })
      .then(() => {
        return res.send({success: true, message: 'Account registered!'});
      })
      .catch((e) => {
        res.send({success: false, Error: e, message: "Error while registering user."});
      })
  }
}

module.exports = AuthController;


