const pug = require('pug');
const template = 'strong #{message}';
const context = { message: 'Hello template!' };
const fn = pug.compile(template);
console.log(fn(context));
