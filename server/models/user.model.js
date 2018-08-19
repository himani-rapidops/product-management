'use strict';
const mongoose = require('mongoose');

const UserModel = function() {
    const userSchema = mongoose.Schema({
        Email : String,
        Password : String,
    });
    return mongoose.model('User', userSchema);
};

module.exports = new UserModel();
