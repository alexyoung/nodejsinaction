const level = require('level');

const db = level('./app.db', {
  valueEncoding: 'json'
});
