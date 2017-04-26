const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send(`
<html>
  <head>
    <title>My to-do list</title>
  </head>
  <body>
    <h1>Welcome to my awesome to-do list</h1>
  </body>
</html>
  `);
});

app.listen(port, () => {
  console.log('Running on port', port);
});
