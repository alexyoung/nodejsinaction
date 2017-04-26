'use strict';
const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('./input.html');
const moment = require('moment');
const $ = cheerio.load(html);
const books = $('.book')
  .map((i, el) => {
    return {
      author: $(el).find('h2').text(),
      title: $(el).find('h3').text(),
      published: $(el).find('h4').text()
    };
  })
  .get();

console.log('title, author, sourceDate, dbDate');

books.forEach((book) => {
  let date = moment(new Date(book.published));
  console.log(
    '%s, %s, %s, %s',
    book.author,
    book.title,
    book.published,
    date.format('YYYY-MM-DD')
  );
});
