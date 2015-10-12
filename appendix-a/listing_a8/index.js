const connect = require('connect');
const morgan = require('morgan');

connect()
  .use(morgan('combined'))
  .use((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end('Logging\n');
  })
  .listen(3000);
