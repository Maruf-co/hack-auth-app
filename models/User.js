const mongoose = require('mongoose');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

UserSchema.pre('save', function(next) {
  next()
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
  if (password === this.password) {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

module.exports = mongoose.model('User', UserSchema);