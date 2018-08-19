const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto').randomBytes(256).toString('hex');

class AuthController {
  constructor(app) {
    // all routes are defined here
    app.post('/login', this.login);
    app.post('/register', this.register);

  }


  // do login here
  async login(req, res) {
    try {
      if (!req.body.Email) {
        return res.send({success: false, message: 'please provide email'});
      }
      if (!req.body.Password) {
        return res.send({success: false, message: 'please provide password'});
      }
      let emailAddress = req.body.Email.toLowerCase();
      let password = req.body.Password;
      const user = await User.findOne({Email: emailAddress});
      if(!user) {
        return res.send({success: false, message: 'User not found.'});
      }
      if (password !== user.Password) {
        return res.send({success: false, message: 'Password invalid'});
      }
      const token = await jwt.sign({userId: user._id}, crypto, {expiresIn: '1h'});
      res.send({
        success: true,
        message: 'Login Successful!',
        token: token,
        user: user
      });
    } catch (e) {
      res.send({success: false, Error: e, message: "Error while logging user."});
    }
  }


  // do register here
  async register(req, res) {
    try {
      if (!req.body.Email) {
        return res.send({success: false, message: 'please provide email'});
      }
      if (!req.body.Password) {
        return res.json({success: false, message: 'please provide password'});
      }
      let newUser = new User({
        Email: req.body.Email.toLowerCase(),
        Password: req.body.Password
      });
      const user = await User.findOne({Email: newUser.Email});

      if (user) {
        return res.send({success: false, message: " User already Exist."});
      } else {
        await newUser.save();
      }
      return res.send({success: true, message: 'Account registered!'});
    } catch (e) {
      return res.send({success: false, Error: e, message: "Error while registering user."});
    }
  }
}

module.exports = AuthController;


