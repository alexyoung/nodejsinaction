'use strict';

function blogPage(entries) {
  let output = `
    <html>
    <head>
      <style type="text/css">
        .entry_title { font-weight: bold; }
        .entry_date { font-style: italic; }
        .entry_body { margin-bottom: 1em; }
      </style>
    </head>
    <body>
  `;
  entries.map(entry => {
    output += `
      <div class="entry_title">${entry.title}</div>
      <div class="entry_date">${entry.date}</div>
      <div class="entry_body">${entry.body}</div>
    `;
  });
  output += '</body></html>';
  return output;
}

console.log(blogPage([{ title: 'test', date: 'now', body: 'hi' }]));
