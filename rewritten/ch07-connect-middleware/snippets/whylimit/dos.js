var http = require('http');
var n = 30000;
var req = http.request({
  method: 'POST',
  port: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

req.write('[');

while (n--) {
  req.write('"foo",');
}

req.write('"bar"]');
req.end();
