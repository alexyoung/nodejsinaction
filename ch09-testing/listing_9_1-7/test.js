'use strict';
const assert = require('assert');
const Todo = require('./todo');
const todo = new Todo();
let testsCompleted = 0;

function deleteTest() {
  todo.add('Delete Me');
  assert.equal(todo.length, 1, '1 item should exist');
  todo.deleteAll();
  assert.equal(todo.length, 0, 'No items should exist');
  testsCompleted++;
}

function addTest () {
  todo.deleteAll();
  todo.add('Added');
  assert.notEqual(todo.length, 0, '1 item should exist');
  testsCompleted++;
}

function doAsyncTest(cb) {
  todo.doAsync(value => {
    assert.ok(value,'Callback should be passed true');
    testsCompleted++;
    cb();
  });
}

function throwsTest(cb) {
  assert.throws(todo.add, /requires/);
  testsCompleted++;
}

deleteTest();
addTest();
throwsTest();
doAsyncTest(() => {
  console.log(`Completed ${testsCompleted} tests`);
});
