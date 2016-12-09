const ejs = require('ejs');
const fs = require('fs');
const template = fs.readFileSync('./templates/blog_page.ejs', 'utf8');

function blogPage(entries) {
  const values = { entries };
  return ejs.render(template, values);
}

const sampleContent = [{
  title: 'It\'s my birthday!',
  date: 'January 12, 2017',
  body: 'I am getting old, but thankfully I\'m not in jail!'
}, {
  body: 'I\'ve been watching a lot of movies lately. It\'s relaxing, except when they have clowns in them.',
  title: 'Movies are pretty good',
  date: 'January 2, 2017'
}];

console.log(blogPage(sampleContent));
