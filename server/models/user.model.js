'use strict';

class UserModel {
    constructor() {
      try {
        this.user = global.Mongoose.model('User');
      } catch (error) {
        this.__userSchema = new global.Mongoose.Schema({
            Email: { type: String },
            Password: { type: String }
        },
        {
          versionKey: false,
          collection: 'users'
        }
        );
        this.user = global.Mongoose.model('User', this.__userSchema);
      }
    }
  
  }
  
  module.exports = UserModel;