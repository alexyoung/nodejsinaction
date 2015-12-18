const fs = require('fs');

module.exports = (cb) => {
  fs.readFile('./main.js', { encoding: 'utf8' }, cb);
};
