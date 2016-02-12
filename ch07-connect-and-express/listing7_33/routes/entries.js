const Entry = require('../models/entry');

exports.list = (req, res, next) => {
  const page = req.page;
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err);
    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
};

exports.form = (req, res) => {
  res.render('post', { title: 'Post' });
};

exports.submit = (req, res, next) => {
  const data = req.body.entry;
  const user = res.locals.user;
  const username = user ? user.name : null;
  const entry = new Entry({
    username: username,
    title: data.title,
    body: data.body
  });

  entry.save((err) => {
    if (err) return next(err);
    if (req.remoteUser) {
      res.json({ message: 'Entry added.' });
    } else {
      res.redirect('/');
    }
  });
};
