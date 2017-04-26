const User = require('../models/user');

exports.submit = (req, res, next) => {
  const data = req.body.user;
  User.authenticate(data.name, data.pass, (err, user) => {
    if (err) return next(err);
    if (user) {
      req.session.uid = user.id;
      res.redirect('/');
    } else {
      res.error('Sorry! invalid credentials. ');
      res.redirect('back');
    }
  });
};

exports.form = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  })
};
