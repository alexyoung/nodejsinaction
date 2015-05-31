var auth = require('basic-auth');
var connect = require('connect');

function passwordValid(credentials) {
  return credentials
    && credentials.name === 'tj'
    && credentials.pass === 'tobi';
}

connect()
  .use(function(req, res, next) {
    var credentials = auth(req);

    if (passwordValid(credentials)) {
      next();
    } else {
      res.writeHead(401, {
        'WWW-Authenticate': 'Basic realm="example"'
      });
      res.end();
    }
  })
  .use(function(req, res) {
    res.end('This is the secret area\n');
  })
  .listen(3000);
