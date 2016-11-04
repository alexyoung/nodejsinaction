const sqlite3 = require('sqlite3').verbose();
const dbName = process.env.NODE_ENV === 'test' ? 'tldr-test.sqlite' : 'tldr.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS articles (id integer primary key, title, content TEXT, created)\n');
});

class Article {
  static all(cb) {
    db.all('SELECT * FROM articles ORDER BY created', cb);
  }

  static find(id, cb) {
    db.get('SELECT * FROM articles WHERE id = ?', id, cb);
  }

  static create(data, cb) {
    const stmt = db.prepare('INSERT INTO articles(title, content, created) VALUES (?, ?, ?)');
    stmt.run(data.title, data.content, data.created);
    stmt.finalize(cb);
  }

  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));

    const stmt = db.prepare('DELETE FROM articles WHERE id = ?');
    stmt.run(id);
    stmt.finalize(cb);
  };
}

module.exports = db;
module.exports.Article = Article;

