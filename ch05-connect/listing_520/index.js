const connect = require('connect');
const bodyParser = require('body-parser');

connect()
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.end('Name: ' + req.body.name + '\n');
  })
  .listen(3000);
