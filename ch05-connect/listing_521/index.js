const connect = require('connect');
const multipart = require('connect-multiparty');

connect()
  .use(multipart())
  .use((req, res, next) => {
    console.log(req.files);
    res.end('Upload received\n');
  })
  .listen(3000);
