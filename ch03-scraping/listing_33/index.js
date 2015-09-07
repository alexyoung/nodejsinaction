const jsdom = require('jsdom');
const html = `
<div class="book">
  <h2>Catch-22</h2>
  <h3>Joseph Heller</h3>
  <p>A satirical indictment of military madness.</p>
</div>
`;

jsdom.env(html, ['./node_modules/jquery/dist/jquery.js'], scrape);

function scrape(err, window) {
  var $ = window.$;
  $('.book').each(function() {
    var $el = $(this);
    console.log({
      title: $el.find('h2').text(),
      author: $el.find('h3').text(),
      description: $el.find('p').text()
    });
  });
}
