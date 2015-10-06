const connect = require('connect');
const session = require('express-session');

connect()
  .use(session({
    secret: 'example secret',
    resave: false,
    saveUninitialized: true
  }))
  .use((req, res) => {
    req.session.views = req.session.views || 0;
    req.session.views++;
    res.end('Views:' + req.session.views);
  })
  .listen(3000);
