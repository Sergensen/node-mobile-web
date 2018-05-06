const User = require('mongoose').model('User');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end();
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end(); }
    return User.findById(decoded.sub, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      req.user = user
      return next();
    });
  });
};
