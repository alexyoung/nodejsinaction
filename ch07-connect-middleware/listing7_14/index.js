var bodyParser = require('body-parser');
var connect = require('connect');
var csurf = require('csurf');
var session = require('express-session');
var sesionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: '1234'
};

connect()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(session(sesionOptions))
  .use(csurf())
  .use(function(req, res, next) {
    if ('/' != req.url) return next();

    var token = req.csrfToken();
    var html = '';
    html += '<form method="post" action="/save">';
    html += '  <input type="text" name="_csrf" value="' + token + '">';
    html += '  <button type="submit">Submit</button>';
    html += '</form>';

    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  })
  .use(function(req, res) {
    var html = '';
    html += '<p>Body: ' + req.body._csrf + '</p>';
    html += '<p>Session secret: ' + req.session.csrfSecret + '</p>';
    res.end(html);
  })
  .use(function(err, req, res, next) {
    console.error(err);
    res.end('Did you get the csrf token wrong?');
  })
  .listen(3000);
