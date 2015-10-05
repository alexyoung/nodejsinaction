var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');

connect()
  .use(serveIndex('public'))
  .use(serveStatic('public'))
  .listen(3000);
