const jade = require('jade');
const fs = require('fs');
const templateFile = './templates/page.jade';
const iterTemplate = fs.readFileSync(templateFile);
const context = { messages: [
  'You have logged in successfully.',
  'Welcome back!'
]};
const iterFn = jade.compile(
  iterTemplate,
  { filename: templateFile }
);
console.log(iterFn(context));
