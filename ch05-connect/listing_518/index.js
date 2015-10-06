const connect = require('connect');
const bodyParser = require('body-parser');

connect()
  .use(bodyParser.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You sent: ' + JSON.stringify(req.body) + '\n');
  })
  .listen(3000);
