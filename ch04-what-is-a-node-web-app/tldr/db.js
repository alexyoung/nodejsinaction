var sqlite3 = require('sqlite3').verbose();
var dbName = process.env.NODE_ENV === 'test' ? 'tldr-test.sqlite' : 'tldr.sqlite';
var db = new sqlite3.Database(dbName);

module.exports = db;
module.exports.Article = Article;

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS articles (id integer primary key, title, content TEXT, created)\n');
});

function Article() {
}

Article.all = function(cb) {
  db.all('SELECT * FROM articles ORDER BY created', cb);
};

Article.find = function(id, cb) {
  db.get('SELECT * FROM articles WHERE id = ?', id, cb);
};

Article.create = function(data, cb) {
  var stmt = db.prepare('INSERT INTO articles(title, content, created) VALUES (?, ?, ?)');
  stmt.run(data.title, data.content, data.created);
  stmt.finalize(cb);
};

Article.delete = function(id, cb) {
  if (!id) return cb(new Error('Please provide an id'));

  var stmt = db.prepare('DELETE FROM articles WHERE id = ?');
  stmt.run(id);
  stmt.finalize(cb);
};
