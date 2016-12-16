const level = require('level');

const db = level('./app.db', {
  valueEncoding: 'json'
});

const options = {
  keyEncoding: 'binary',
  valueEncoding: 'hex'
};

db.put(new Uint8Array([1, 2, 3]), '0xFF0099', options, (err) => {
  if (err) throw err;
  db.get(new Uint8Array([1, 2, 3]), options, (err, value) => {
    if (err) throw err;
    console.log(value);
  });
});
