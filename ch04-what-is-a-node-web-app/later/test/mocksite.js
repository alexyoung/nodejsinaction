var fs = require('fs');
var express = require('express');
var app = express();

app.get('/example.html', function(req, res) {
  fs.createReadStream(__dirname + '/example.html').pipe(res);
});


module.exports = app;
