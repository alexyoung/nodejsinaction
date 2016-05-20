const vows = require('vows');
const assert = require('assert');
const Todo = require('./../todo');

vows.describe('Todo').addBatch({
  'when adding an item': {
    topic: () => {
      const todo = new Todo();
      todo.add('Feed my cat');
      return todo;
    },
    'it should exist in my todos': (er, todo) => {
      assert.equal(todo.length, 1);
    }
  }
}).export(module);
