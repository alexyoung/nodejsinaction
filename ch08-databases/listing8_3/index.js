const pg = require('pg');
const db = new pg.Client({ database: 'articles' });

db.connect((err, client) => {
  if (err) throw err;
  console.log('Connected to database', db.database);

  const body = 'hello world';
  db.query(`
    INSERT INTO snippets (body) VALUES (
      '${body}'
    )
    RETURNING id
  `, (err, result) => {
    if (err) throw err;
    const id = result.rows[0].id;
    console.log('Inserted row with id %s', id);

    db.query(`
      INSERT INTO snippets (body) VALUES (
        '${body}'
      )
      RETURNING id
    `, () => {
      if (err) throw err;
      const id = result.rows[0].id;
      console.log('Inserted row with id %s', id);
      db.end();
    });
  });
});