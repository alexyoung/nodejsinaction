const connect = require('connect');
const bodyParser = require('body-parser');

function verifyRequest(req, res, buf, encoding) {
  if (!buf.toString().match(/^name=/)) {
    throw new Error('Bad format');
  }
}

connect()
  .use(bodyParser.urlencoded({
    extended: false,
    limit: 10,
    verify: verifyRequest
  }))
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You sent: ' + JSON.stringify(req.body) + '\n');
  })
  .listen(3000);
