const express = require('express');
const app = express();
const articles = [{ title: 'Example' }];

app.get('/articles', (req, res) => {
  res.send(articles);
});

app.post('/articles', (req, res) => {
  res.send('OK');
});

app.get('/articles/:id', (req, res) => {
  const id = req.params.id;
  console.log('Fetching:', id);
  res.send(articles[id]);
});

app.delete('/articles/:id', (req, res) => {
  const id = req.params.id;
  console.log('Deleting:', id);
  delete articles[id];
  res.send({ message: 'Deleted' });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
