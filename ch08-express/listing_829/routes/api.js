const auth = require('basic-auth');
const User = require('../models/user');

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  });
};

exports.auth = (req, res, next) => {
  auth(req);
  next();
};
