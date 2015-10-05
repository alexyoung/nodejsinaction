var connect = require('connect');

var db = {
  users: [
    { name: 'tobi' },
    { name: 'loki' },
    { name: 'jane' }
  ]
};

function users(req, res, next) {
  var match = req.url.match(/^\/users\/(.+)/);
  var user;
  var err;

  if (match) {
    user = db.users[match[1]];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
}

connect()
  .use(users)
  .listen(3000);
