const connect = require('connect');
const errorHandler = require('./middleware/errorhandler');

function makeError(req, res, next) {
  next(new Error('error: raised on purpose'));
}

connect()
  .use(errorHandler)
  .use(makeError)
  .listen(3000);
