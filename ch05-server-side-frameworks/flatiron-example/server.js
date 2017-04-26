const flatiron = require('flatiron');
const app = flatiron.app;
const port = process.env.PORT || 8080;

app.use(flatiron.plugins.http);

app.router.get('/', function() {
  this.res.writeHead(200, { 'Content-Type': 'text/plain' });
  this.res.end('Hello world!\n');
});

app.start(port, () => {
  console.log('App started. Running at: http://localhost:%s', port);
});
