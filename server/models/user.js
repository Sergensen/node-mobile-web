const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String,
  surname: String,
  username: String,
  friends: [String],
  inRequests: [String],
  outRequests: [String]
});

User.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

User.pre('save', function saveHook(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }
      user.password = hash;
      return next();
    });
  });
});

module.exports = mongoose.model('User', User);
