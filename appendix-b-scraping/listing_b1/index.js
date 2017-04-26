const html = `
<html>
<body>
  <div class="book">
    <h2>Catch-22</h2>
    <h3>Joseph Heller</h3>
    <p>A satirical indictment of military madness.</p>
  </div>
</body>
</html>`;
const cheerio = require('cheerio');
const $ = cheerio.load(html);

const book = {
  title: $('.book h2').text(),
  author: $('.book h3').text(),
  description: $('.book p').text()
};

console.log(book);
