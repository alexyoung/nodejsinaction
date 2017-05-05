'use strict';
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const user = require('./middleware/user');
const validate = require('./middleware/validate');

const routes = require('./routes/index');
const entries = require('./routes/entries');
const users = require('./routes/users');
const register = require('./routes/register');
const messages = require('./middleware/messages');
const page = require('./middleware/page');
const Entry = require('./models/entry');
const login = require('./routes/login');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(messages);
app.use('/api', api.auth);
app.use(user);

app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries);

app.get('/post', entries.form);
app.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit);

app.use('/users', users);

app.get('/register', register.form);
app.post('/register', register.submit);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.param('page', (req, res, next, id) => {
  if (!isNaN(parseInt(id, 10))) {
    next();
  } else {
    routes.notfound(req, res, next);
  }
});

app.get('/:page?', page(Entry.count, 5), entries.list);

if (process.env.ERROR_ROUTE) {
  app.get('/dev/error', (req, res, next) => {
    let err = new Error('database connection failed');
    err.type = 'database';
    next(err);
  });
}

app.use(routes.notfound);
app.use(routes.error);

module.exports = app;
