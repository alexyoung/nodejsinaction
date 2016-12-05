const ejs = require('ejs');
const template = '<%= message %>';
const context = {message: "<script>alert('XSS attack!');</script>"};
console.log(ejs.render(template, context));
