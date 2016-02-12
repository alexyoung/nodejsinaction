const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.submit = (req, res, next) => {
  var data = req.body.user;
  console.log('User:', req.body.user);
  User.getByName(data.name, (err, user) => {
    if (err) return next(err);

    if (user.id) {
      res.error('Username already taken!');
      res.redirect('back');
    } else {
      user = new User({ name: data.name, pass: data.pass });
      user.save((err) => {
        if (err) return next(err);
        req.session.uid = user.id;
        res.redirect('/')
      });
    }
  });
};
