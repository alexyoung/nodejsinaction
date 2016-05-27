const sinon = require('sinon');
const Database = require('./db');
const fs = require('fs');
const database = new Database('./sample.json');

const stub = sinon.stub(fs, 'writeFile', (file, data, cb) => {
  cb();
});
const saveDone = sinon.spy();

database.insert('name', 'Charles Dickens');
database.save(saveDone);

sinon.assert.calledOnce(stub);
sinon.assert.calledOnce(saveDone);

fs.writeFile.restore();
