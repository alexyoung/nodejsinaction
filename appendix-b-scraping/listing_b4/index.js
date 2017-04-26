const jsdom = require('jsdom');
const jqueryPath = './node_modules/jquery/dist/jquery.js';
const html = `
<div class="book">
  <h2></h2>
  <h3></h3>
  <script>
document.querySelector('h2').innerHTML = 'Catch-22';
document.querySelector('h3').innerHTML = 'Joseph Heller';
  </script>
</div>
`;

const doc = jsdom.jsdom(html);
const window = doc.defaultView;

jsdom.jQueryify(window, jqueryPath, function() {
  var $ = window.$;
  $('.book').each(function() {
    var $el = $(this);
    console.log({
      title: $el.find('h2').text(),
      author: $el.find('h3').text()
    });
  });
});
