var connect = require('connect');
var morgan = require('morgan');

connect()
  .use(morgan('combined'))
  .use(function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end('Logging\n');
  })
  .listen(3000);
