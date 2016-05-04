const ejs = require('ejs');
const fs = require('fs');
const http = require('http');
const filename = './templates/students.ejs';
const students = [
  { name: 'Rick LaRue', age: 23 },
  { name: 'Sarah Cathands', age: 25 },
  { name: 'Bob Dobbs', age: 37 }
];

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(filename, (err, data) => {
      const template = data.toString();
      const context = { students: students };
      const output = ejs.render(template, context);
      res.setHeader('Content-type', 'text/html');
      res.end(output);
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(8000);
