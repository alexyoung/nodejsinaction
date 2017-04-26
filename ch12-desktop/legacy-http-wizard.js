'use strict';
const remote = require('electron').remote;
const request = remote.require('request');
const escape = require('escape-html');
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const menu = new Menu();
const el = {
  response: document.getElementById('response'),
  headers: document.querySelector('#headers .header-body'),
  raw: document.getElementById('raw'),
  error: document.getElementById('error')
}
let lastElement;

function addHeader() {
}

function clearClassNames(selector) {
  Array
    .from(document.querySelectorAll(selector))
    .forEach(li => li.setAttribute('class', ''));
}

function toggleStyle(id, style) {
  document.getElementById(id)
    .setAttribute('style', style);
}

function show(id) {
  toggleStyle(id, '');
}

function hide(id) {
  toggleStyle(id, 'display: none');
}

function selectActive(node) {
  clearClassNames('.nav li');
  node.parentNode.className = 'active';
  show('raw');
  hide('error');
}

function selectErrors(node) {
  clearClassNames('.nav li');
  node.parentNode.className = 'active';
  show('error');
  hide('raw');
}

function getValue(name) {
  return document
    .querySelector(`input[name=${name}]`)
    .value;
}

function makeRequest() {
  const requestOptions = {
    url: getValue('url'),
    headers: {},
    method: getValue('method'),
    body: ''
  };

  console.log('Making request:', requestOptions);

  request(requestOptions, (err, res, body) => {
    el.raw.setAttribute('class', 'raw prettyprint');
    el.error.setAttribute('class', 'raw prettyprint');

    el.response.innerHTML = res ? `(${res.statusCode})` : '(No response)';
    el.raw.innerHTML = body ? escape(body) : '';
    el.error.innerHTML = err ? escape(JSON.stringify(err, null, 2)) : '';

    if (res.headers) {
      Object.keys(res.headers).sort().forEach((key) => {
        let value = res.headers[key];
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdValue = document.createElement('td');

        console.log(`key: ${key} ${value}`);

        tdName.setAttribute('class', 'name');
        tdValue.setAttribute('class', 'value');

        tdName.textContent = key;
        tdValue.textContent = value;

        tr.appendChild(tdName);
        tr.appendChild(tdValue);

        el.headers.appendChild(tr);
      });
    }

    prettyPrint();
  });
}

menu.append(new MenuItem({ label: 'Close Pane', click: () => { console.log('item 1 clicked'); } }));

window.addEventListener('contextmenu', (e) => {
  lastElement = e.target;
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

