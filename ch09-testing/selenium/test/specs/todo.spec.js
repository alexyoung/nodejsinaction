'use strict';
const assert = require('assert');
const webdriverio = require('webdriverio');

describe('todo tests', () => {
  let client;

  before(() => {
    client = webdriverio.remote();
    return client.init();
  });

  it('todo list test', () => {
    return client
      .url('/')
      .getTitle()
        .then(title => assert.equal(title, 'My to-do list'));
  });
});
