var express = require('express');
var app = express();
var articles = [{ title: 'Example' }];
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', function(req, res, err) {
  res.send(articles);
});

app.post('/articles', function(req, res, next) {
  var article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

app.get('/articles/:id', function(req, res, next) {
  var id = req.params.id;
  console.log('Fetching:', id);
  res.send(articles[id]);
});

app.delete('/articles/:id', function(req, res, next) {
  var id = req.params.id;
  console.log('Deleting:', id);
  delete articles[id];
  res.send({ message: 'Deleted' });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
