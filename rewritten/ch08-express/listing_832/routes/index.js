const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

exports.notfound = (req, res) => {
  res.status(404).format({
    html: () => {
      res.render('404');
    },
    json: () => {
      res.send({ message: 'Resource not found' });
    },
    xml: () => {
      res.write('<error>\n');
      res.write('  <message>Resource not found</message>\n');
      res.end('</error>\n');
    },
    text: () => {
      res.send('Resource not found\n');
    }
  });
};

module.exports = router;
