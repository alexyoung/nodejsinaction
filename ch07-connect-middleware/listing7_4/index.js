var connect = require('connect');
var bodyParser = require('body-parser');

connect()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You sent: ' + JSON.stringify(req.body) + '\n');
  })
  .listen(3000);
