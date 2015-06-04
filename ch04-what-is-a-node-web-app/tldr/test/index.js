var assert = require('assert');
var app = require('..');
var mocksite = require('./mocksite');
var request = require('supertest');
var db = require('../db');
var server;

function deleteArticles(done) {
  db.exec('DELETE FROM articles\n', done);
}

function startServer(done) {
  server = mocksite.listen(3001, done);
}

function createArticle(done) {
  db.exec('INSERT INTO articles (title) VALUES ("Ode on a Grecian Urn")', done);
}

describe('article API', function() {
  before(function(done) {
    deleteArticles(startServer(createArticle(done)));
  });

  after(function(done) {
    server.close();
    done();
  });

  it('should allow articles to be created', function(done) {
    request(app)
      .post('/articles')
      .send({ url: 'http://localhost:3001/example.html' })
      .end(function(err, res){
        if (err) throw err;
        assert.equal(res.body.title, 'Ode on a Grecian Urn');
        done();
      });
  });

  it('should return all articles', function(done) {
    request(app)
      .get('/articles')
      .end(function(err, res){
        if (err) throw err;
        assert(Array.isArray(res.body));
        done();
      });
  });

  it('should return a single article', function(done) {
    request(app)
      .get('/articles/1')
      .end(function(err, res){
        if (err) throw err;
        assert.equal(res.body.title, 'Ode on a Grecian Urn');
        done();
      });
  });

  it('should allow articles to be deleted', function(done) {
    request(app)
      .delete('/articles/1')
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
});
