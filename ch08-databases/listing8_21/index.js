const level = require('levelup')
const memdown = require('memdown')

const db = level('./level-articles.db', {
  keyEncoding: 'json',
  valueEncoding: 'json',
  db: memdown
});
