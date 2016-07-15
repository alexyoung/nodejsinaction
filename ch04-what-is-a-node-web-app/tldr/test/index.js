const assert = require('assert');
const app = require('..');
const mocksite = require('./mocksite');
const request = require('supertest');
const db = require('../db');
const server;

function deleteArticles(done) {
  db.exec('DELETE FROM articles\n', done);
}

function startServer(done) {
  server = mocksite.listen(3001, done);
}

function createArticle(done) {
  db.exec('INSERT INTO articles (title) VALUES ("Ode on a Grecian Urn")', done);
}

describe('article API', () => {
  before((done) => {
    deleteArticles(startServer(createArticle(done)));
  });

  after((done) => {
    server.close();
    done();
  });

  it('should allow articles to be created', (done) => {
    request(app)
      .post('/articles')
      .send({ url: 'http://localhost:3001/example.html' })
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.title, 'Ode on a Grecian Urn');
        done();
      });
  });

  it('should return all articles', (done) => {
    request(app)
      .get('/articles')
      .end((err, res) => {
        if (err) throw err;
        assert(Array.isArray(res.body));
        done();
      });
  });

  it('should return a single article', (done) => {
    request(app)
      .get('/articles/1')
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.title, 'Ode on a Grecian Urn');
        done();
      });
  });

  it('should allow articles to be deleted', (done) => {
    request(app)
      .delete('/articles/1')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});
