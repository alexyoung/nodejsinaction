const sinon = require('sinon');
const Database = require('./db');
const fs = require('fs');
const database = new Database('./sample.json');

const fsWriteFileSpy = sinon.spy(fs, 'writeFile');
const saveDone = sinon.spy();

database.insert('name', 'Charles Dickens');
database.save(saveDone);

sinon.assert.calledOnce(fsWriteFileSpy);

fs.writeFile.restore();
