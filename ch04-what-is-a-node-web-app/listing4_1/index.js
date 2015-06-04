var express = require('express');
var app = express();
var articles = [{ title: 'Example' }];

app.get('/articles', function(req, res, err) {
  res.send(articles);
});

app.post('/articles', function(req, res, next) {
  res.send('OK');
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
