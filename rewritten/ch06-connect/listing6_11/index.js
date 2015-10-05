var connect = require('connect');
var rewrite = require('./middleware/rewrite');

function showPost(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('URL: ' + req.url);
}

connect()
  .use(rewrite)
  .use(showPost)
  .listen(3000, function() {
    console.log('Listening on:', 3000);
  });
