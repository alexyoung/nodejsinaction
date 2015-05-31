var connect = require('connect');

function createLogger(format) {
  var regexp = /:(\w+)/g;

  return function logger(req, res, next) {
    var str = format.replace(regexp, function(match, property) {
      return req[property];
    });

    console.log(str);
    next();
  }
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

connect()
  .use(createLogger(':method :url'))
  .use(hello)
  .listen(3000);
