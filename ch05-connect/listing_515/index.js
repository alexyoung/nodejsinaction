const connect = require('connect');
const cookieParser = require('cookie-parser');

connect()
  .use(cookieParser())
  .use((req, res, next) => {
    res.end(JSON.stringify(req.cookies));
  })
  .listen(3000);
