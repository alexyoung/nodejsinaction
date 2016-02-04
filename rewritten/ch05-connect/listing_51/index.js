const connect = require('connect');
const app = connect();
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
app.listen(3000);
