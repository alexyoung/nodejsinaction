const connect = require('connect');
const setup = require('./logger.js')
 
function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

const app = connect()
  .use(setup(':method :url'))
  .use(hello)
  .listen(3000);