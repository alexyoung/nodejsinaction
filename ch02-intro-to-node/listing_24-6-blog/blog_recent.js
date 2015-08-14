var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
  if (req.url == '/') {
    fs.readFile('./titles.json', function(err, data) {
      var titles;
      if (err) {
        console.error(err);
        res.end('Server Error');
      } else {
        titles = JSON.parse(data.toString());
        fs.readFile('./template.html', function(err, data) {
          var tmpl;
          var html;
          if (err) {
            console.error(err);
            res.end('Server Error');
          } else {
            tmpl = data.toString();
            html = tmpl.replace('%', titles.join('</li><li>'));
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
          }
        });
      }
    });
  }
}).listen(8000, '127.0.0.1');
