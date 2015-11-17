const auth = require('basic-auth');
const User = require('../models/user');
const Entry = require('../models/entry');

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  });
};

exports.auth = (req, res, next) => {
  req.remoteUser = auth(req);
  next();
};

exports.entries = (req, res, next) => {
  const page = req.page;
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err);
    res.format({
      'application/json': () => {
        res.send(entries);
      },
      'application/xml': () => {
        res.render('entries/xml', { entries: entries });
      }
    })
  });
};
