const ejs = require('ejs');
const fs = require('fs');
const template = fs.readFileSync('./templates/blog_page.ejs', 'utf8');

function blogPage(entries) {
  const values = { entries };
  return ejs.render(template, values);
}

console.log(blogPage([{ title: 'Example', date: new Date(), body: 'Example body' }]));