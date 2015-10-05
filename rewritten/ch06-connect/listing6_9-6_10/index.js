var connect = require('connect');
var router = require('./middleware/router');

var routes = {
  GET: {
    '/users': function(req, res){
      res.end('tobi, loki, ferret');
    },
    '/users/:id': function(req, res, id) {
      res.end('user ' + id);
    }
  },
  DELETE: {
    '/users/:id': function(req, res, id) {
      res.end('deleted user ' + id);
    }
  }
};

connect()
  .use(router(routes))
  .listen(3000);
