const connect = require('connect');

function createLogger(format) {
  const regexp = /:(\w+)/g;

  return function logger(req, res, next) {
    const str = format.replace(regexp, (match, property) => {
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
