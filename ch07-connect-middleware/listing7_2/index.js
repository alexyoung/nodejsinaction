var connect = require('connect');
var qs = require('qs');

connect()
  .use(function(req, res, next) {
    console.log(req._parsedUrl.query);
    req.query = qs.parse(req._parsedUrl.query);
    next();
  })
  .use(function(req, res) {
    console.log('query string:', req.query);
    res.end('\n');
  })
  .listen(3000);
