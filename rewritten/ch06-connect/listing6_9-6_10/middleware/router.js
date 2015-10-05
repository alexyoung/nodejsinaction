var parse = require('url').parse;
module.exports = function route(obj) {
  return function(req, res, next) {
    if (!obj[req.method]) {
      next();
      return;
    }

    var routes = obj[req.method];
    var url = parse(req.url);
    var paths = Object.keys(routes);
    var path;
    var fn;
    var re;
    var captures;

    for (var i = 0; i < paths.length; i++) {
      path = paths[i];
      fn = routes[path];
      path = path
        .replace(/\//g, '\\/')
        .replace(/:(\w+)/g, '([^\\/]+)');
      re = new RegExp('^' + path + '$');
      captures = url.pathname.match(re);
      if (captures) {
        var args = [req, res].concat(captures.slice(1));
        fn.apply(null, args);
        return;
      }
    }

    next();
  }
};
