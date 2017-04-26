const ejs = require('ejs');
ejs.delimiter = '$'
const template = '<$= message $>';
const context = { message: 'Hello template!' };
console.log(ejs.render(template, context));
