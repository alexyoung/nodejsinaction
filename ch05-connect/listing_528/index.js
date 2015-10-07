const bodyParser = require('body-parser');
const connect = require('connect');
const csurf = require('csurf');
const session = require('express-session');
const sesionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: '1234'
};

connect()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(session(sesionOptions))
  .use(csurf())
  .use((req, res, next) => {
    if ('/' != req.url) return next();

    const token = req.csrfToken();
    const html = `
    <form method="post" action="/save">
      <input type="text" name="_csrf" value="${token}">
      <button type="submit">Submit</button>
    </form>`

    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  })
  .use((req, res) => {
    const html = `
      <p>Body: ${req.body._csrf}</p>
      <p>Session secret: ${req.session.csrfSecret}</p>
    `;
    res.end(html);
  })
  .use((err, req, res, next) => {
    console.error(err);
    res.end('Did you get the csrf token wrong?');
  })
  .listen(3000);
