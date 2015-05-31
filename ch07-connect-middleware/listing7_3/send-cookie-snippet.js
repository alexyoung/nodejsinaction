var connect = require('connect');

connect()
  .use(function(req, res) {
    res.setHeader('Set-Cookie', 'foo=bar');
    res.setHeader('Set-Cookie', 'tobi=ferret;[CA]Expires=Tue, 08 Jun 2021 10:18:14 GMT');
    res.end();
  })
  .listen(3000);
