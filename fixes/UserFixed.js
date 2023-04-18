const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const saltRounds = 10;
const secret = 'mysecretsshhh';
const key = 'User';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

UserSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}


const cipher = crypto.createCipher('aes256', secret);
const modelName = cipher.update(key, 'utf8', 'hex') + cipher.final('hex');

const User = mongoose.model(modelName, UserSchema);

module.exports = User;