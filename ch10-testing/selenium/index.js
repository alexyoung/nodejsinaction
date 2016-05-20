const express = require('express');
const app = express();

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

app.listen(process.env.PORT, () => {
  console.log('Running on port', process.env.PORT);
});
