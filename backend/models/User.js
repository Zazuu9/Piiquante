const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserValidator = require('../validators/user');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, match: UserValidator.emailRegex},
    password: {type: String, required: true, match: UserValidator.passwordRegex},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);