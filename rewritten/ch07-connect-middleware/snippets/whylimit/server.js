var connect = require('connect');
var bodyParser = require('body-parser');

connect()
  .use(bodyParser.json({ limit: 99999999, extended: false }))
  .use(function(req, res, next) {
    res.end('OK\n');
  })
  .listen(3000);
