const auth = require('basic-auth');
const connect = require('connect');

function passwordValid(credentials) {
  return credentials
    && credentials.name === 'tj'
    && credentials.pass === 'tobi';
}

connect()
  .use((req, res, next) => {
    const credentials = auth(req);

    if (passwordValid(credentials)) {
      next();
    } else {
      res.writeHead(401, {
        'WWW-Authenticate': 'Basic realm="example"'
      });
      res.end();
    }
  })
  .use((req, res) => {
    res.end('This is the secret area\n');
  })
  .listen(3000);
