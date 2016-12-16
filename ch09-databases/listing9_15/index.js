const redis = require('redis');

const db = redis.createClient();

db.on('connect', () => console.log('Redis client connected to server.'));
db.on('ready', () => console.log('Redis server is ready.'));
db.on('error', err => console.error('Redis error', err));

db.hmset('camping', {
  shelter: '2-person tent',
  cooking: 'campstove'
}, redis.print);

db.hget('camping', 'cooking', (err, value) => {
  if (err) throw err;
  console.log('Will be cooking with:', value);
});

db.hkeys('camping', (err, keys) => {
  if (err) throw err;
  keys.forEach(key => console.log(`  ${key}`));
});

