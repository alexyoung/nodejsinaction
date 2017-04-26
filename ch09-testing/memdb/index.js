'use strict';
const db = [];

exports.save = (doc) => {
  db.push(doc);
};

exports.first = (obj) => {
  return db.filter((doc) => {
    for (let key in obj) {
      if (doc[key] != obj[key]) {
        return false;
      }
    }
    return true;
  }).shift();
};

exports.clear = () => {
  db.length = 0;
};

// Original version in listing 10.10:

exports.saveSync = (doc, cb) => {
  db.push(doc);
};

// Later version for testing asynchronous logic

exports.save = (doc, cb) => {
  db.push(doc);

  if (cb) {
    setTimeout(() => {
      cb();
    }, 1000);
  }
};
