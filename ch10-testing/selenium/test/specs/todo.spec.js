'use strict';
const assert = require('assert');
const webdriverio = require('webdriverio');

describe('todo tests', () => {
  let client;

  before(function(){
    client = webdriverio.remote();
    return client.init();
  });

  it('todo list test', () => {
    return client
      .url('/')
      .getTitle()
        .then(title => assert(title === 'My to-do list'));
  });
});
