const ejs = require('ejs');
const template = '<%= message %>';
const context = { message: 'Hello template!' };
console.log(ejs.render(template, context));
