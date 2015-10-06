const connect = require('connect');
const qs = require('qs');

connect()
  .use((req, res, next) => {
    console.log(req._parsedUrl.query);
    req.query = qs.parse(req._parsedUrl.query);
    next();
  })
  .use((req, res) => {
    console.log('query string:', req.query);
    res.end('\n');
  })
  .listen(3000);
