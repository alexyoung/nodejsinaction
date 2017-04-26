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
