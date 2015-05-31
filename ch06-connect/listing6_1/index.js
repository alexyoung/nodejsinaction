var connect = require('connect');
var app = connect();

app.use(function(req, res, next) {
  console.log(req.headers);
  next();
});

app.listen(3000);
