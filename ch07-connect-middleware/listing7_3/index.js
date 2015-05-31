var connect = require('connect');
var cookieParser = require('cookie-parser');
var secret = 'tobi is a cool ferret';

connect()
  .use(cookieParser(secret))
  .use(function(req, res) {
    console.log('Cookies:', req.cookies);
    console.log('Signed cookies:',
      req.signedCookies
    );
    res.end('hello\n');
  }).listen(3000);
