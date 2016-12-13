const pg = require('pg');
const db = new pg.Client({ database: 'articles' });

db.connect((err, client) => {
  if (err) throw err;
  console.log('Connected to database', db.database);

  db.query(`
    CREATE TABLE IF NOT EXISTS snippets (
      id SERIAL,
      PRIMARY KEY(id),
      body text
    );
  `, (err, result) => {
    if (err) throw err;
    console.log('Created table "snippets"');
    db.end();
  });
});