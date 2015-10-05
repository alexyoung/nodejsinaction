'use strict';
const connect = require('connect');

const db = {
  users: [
    { name: 'tobi' },
    { name: 'loki' },
    { name: 'jane' }
  ]
};

function users(req, res, next) {
  const match = req.url.match(/^\/users\/(.+)/);

  if (match) {
    let user = db.users[match[1]];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      let err = new Error('User not found');
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
