var connect = require('connect');
var fs = require('fs');

function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

function restrictFileAccess(req, res, next) {
  if (['/', '/index.js'].indexOf(req.url) !== -1) {
    next();
  } else {
    next(new Error('File not found: ' + req.url));
  }
}

function serveStaticFiles(req, res, next) {
  if (req.url === '/index.js') {
    fs.createReadStream('./index.js').pipe(res);
  } else {
    next();
  }
}

connect()
  .use(logger)
  .use(restrictFileAccess)
  .use(serveStaticFiles)
  .use(hello)
  .listen(3000);
