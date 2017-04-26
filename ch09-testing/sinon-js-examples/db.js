'use strict';
const fs = require('fs');

class Database {
  constructor(filename) {
    this.filename = filename;
    this.data = {};
  }

  save(cb) {
    fs.writeFile(this.filename, JSON.stringify(this.data), cb);
  }

  insert(key, value) {
    this.data[key] = value;
  }
}

module.exports = Database;
