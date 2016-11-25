'use strict';
const auth = require('basic-auth');
const User = require('../models/user');
const Entry = require('../models/entry');

exports.auth = (req, res, next) => {
  const { name, pass } = auth(req);
  User.authenticate(name, pass, (err, user) => {
    if (user) req.remoteUser = user;
    next(err);
  });
};

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  });
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
    });
  });
};
