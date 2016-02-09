const redis = require('redis');
const db = redis.createClient();

class Entry {
  constructor(obj) {
    for (let key in obj) {
    this[key] = obj[key];
    }
  }

  save(cb) {
    const entryJSON = JSON.stringify(this);
    db.lpush(
      'entries',
      entryJSON,
      (err) => {
        if (err) return cb(err);
        cb();
      }
    );
  }
}

module.exports = Entry;
