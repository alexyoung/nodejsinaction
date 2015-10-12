const connect = require('connect');
const cookieParser = require('cookie-parser');
const secret = 'tobi is a cool ferret';

connect()
  .use(cookieParser(secret))
  .use((req, res) => {
    console.log('Cookies:', req.cookies);
    console.log('Signed cookies:', req.signedCookies);
    res.end('hello\n');
  }).listen(3000);
