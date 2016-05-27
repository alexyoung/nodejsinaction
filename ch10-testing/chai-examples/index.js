'use strict';
const chai = require('chai');
const assert = chai.assert;

let foo = 'foo';
const tea = { flavors: ['chai', 'earl grey', 'pg tips'] };
assert.typeOf(foo, 'string');

foo = 'bar';
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3);

assert.property(tea, 'flavors');
assert.lengthOf(tea.flavors, 3);
