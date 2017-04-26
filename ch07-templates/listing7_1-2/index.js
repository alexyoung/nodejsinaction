'use strict';
const fs = require('fs');
const http = require('http');

function getEntries() {
  const entries = [];
  let entriesRaw = fs.readFileSync('./entries.txt', 'utf8');
  entriesRaw = entriesRaw.split('---');
  entriesRaw.map((entryRaw) => {
    const entry = {};
    const lines = entryRaw.split('\n');
    lines.map((line) => {
      if (line.indexOf('title: ') === 0) {
        entry.title = line.replace('title: ', '');
      } else if (line.indexOf('date: ') === 0) {
        entry.date = line.replace('date: ', '');
      } else {
        entry.body = entry.body || '';
        entry.body += line;
      }
    });
    entries.push(entry);
  });
  return entries;
}

const entries = getEntries();
console.log(entries);
