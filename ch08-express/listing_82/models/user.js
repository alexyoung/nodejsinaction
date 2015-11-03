'use strict';
const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient();

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
}

module.exports = User;
