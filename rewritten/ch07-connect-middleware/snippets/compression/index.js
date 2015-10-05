var connect = require('connect');
var compression = require('compression');

connect()
  .use(compression({ threshold: 0 }))
  .use(function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('This response is compressed!\n');
  })
  .listen(3000);
