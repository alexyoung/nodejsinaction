var connect = require('connect');
var multipart = require('connect-multiparty');

connect()
  .use(multipart())
  .use(function(req, res, next) {
    console.log(req.files);
    res.end('Upload received\n');
  })
  .listen(3000);
