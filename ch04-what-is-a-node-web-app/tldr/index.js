var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Article = require('./db').Article;
var read = require('node-readability');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', function(req, res, err) {
  Article.all(function(err, articles) {
    if (err) return next(err);
    res.send(articles);
  });
});

app.post('/articles', function(req, res, next) {
  var url = req.body.url;
  var date = new Date();

  read(url, function(err, result) {
    Article.create({ title: result.title, content: result.content, created: date }, function(err, article) {
      if (err) return next(err);
      res.send({ title: result.title, content: result.content });
    });
  });
});

app.get('/articles/:id', function(req, res, next) {
  var id = req.params.id;
  Article.find(id, function(err, article) {
    if (err) return next(err);
    res.send(article);
  });
});

app.delete('/articles/:id', function(req, res, next) {
  var id = req.params.id;
  Article.delete(id, function(err) {
    if (err) return next(err);
    res.send({ message: 'Deleted' });
  });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
