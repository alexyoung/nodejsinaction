const level = require('level');

const db = level('./app.db', {
  valueEncoding: 'json'
});

const key = 'user';
const value = { name: 'Alice' };

db.put(key, value, err => {
  if (err) throw err;
  db.get(key, (err, result) => {
    if (err) throw err;
    console.log('got value:', result);
    db.del(key, (err) => {
      if (err) throw err;
      console.log('value was deleted');
    });
  });
});

