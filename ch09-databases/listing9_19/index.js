const level = require('level');

const db = level('./app.db', {
  valueEncoding: 'json'
});

db.get('this-key-does-not-exist', (err, value) => {
  if (err && !err.notFound) throw err;
  if (err && err.notFound) return console.log('Value was not found.');
  console.log('Value was found:', value);
});
