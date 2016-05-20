'use strict';
const memdb = require('..');
const assert = require('assert');

describe('memdb', () => {
  beforeEach(() => {
    memdb.clear();
  });

  describe('.save(doc)', () => {
    it('should save the document', () => {
      const pet = { name: 'Tobi' };
      memdb.save(pet);
      const ret = memdb.first({ name: 'Tobi' });
      assert(ret == pet);
    });
  });

  describe('.first(obj)', () => {
    it('should return the first matching doc', () => {
      const tobi = { name: 'Tobi' };
      const loki = { name: 'Loki' };
      memdb.save(tobi);
      memdb.save(loki);
      let ret = memdb.first({ name: 'Tobi' });
      assert(ret == tobi);
      ret = memdb.first({ name: 'Loki' });
      assert(ret == loki);
    });

    it('should return null when no doc matches', () => {
      const ret = memdb.first({ name: 'Manny' });
      assert(ret == null);
    });
  });
});

describe('.save(doc)', () => {
  it('should save the document', (done) => {
    const pet = { name: 'Tobi' };
    memdb.save(pet, () => {
      const ret = memdb.first({ name: 'Tobi' });
      assert(ret == pet);
      done();
    });
  });
});
