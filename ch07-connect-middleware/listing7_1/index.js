var connect = require('connect');
var cookieParser = require('cookie-parser');

connect()
  .use(cookieParser())
  .use(function(req, res, next) {
    res.end(JSON.stringify(req.cookies));
  })
  .listen(3000);
