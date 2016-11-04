const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article;
const read = require('node-readability');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (req, res, err) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.send(articles);
  });
});

app.post('/articles', (req, res, next) => {
  const url = req.body.url;
  const date = new Date();

  read(url, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error downloading article');
      res.send('Error downloading article');
    } if (!result) {
      res.send('No article found');
    } else {
      Article.create({ title: result.title, content: result.content, created: date }, (err, article) => {
        console.log('article created:', article);
        if (err) return next(err);
        res.send({ title: result.title, content: result.content });
      });
    }
  });
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(article);
  });
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: 'Deleted' });
  });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
