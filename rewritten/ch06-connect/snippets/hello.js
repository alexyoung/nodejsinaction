var connect = require('connect');
var app = connect();

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

app.use(hello);
app.listen(3000);
