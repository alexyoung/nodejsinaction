var connect = require('connect');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var favicon = require('serve-favicon');
var options = {
  host: 'localhost'
};

connect()
  .use(favicon(__dirname + '/favicon.ico'))
  .use(session({
    store: new RedisStore(options),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  .use(function(req, res) {
    req.session.views = req.session.views || 0;
    req.session.views++;
    res.end('Views: ' + req.session.views);
  })
  .listen(3000);
