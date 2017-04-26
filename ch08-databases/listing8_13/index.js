const os = require('os');
const { MongoClient } = require('mongodb');
const hostname = os.hostname();

const members = [
  `${hostname}:27018`,
  `${hostname}:27017`,
  `${hostname}:27019`
];

MongoClient.connect(`mongodb://${members.join(',')}/test?replSet=rs0`)
.then(db => {
  db.admin().replSetGetStatus().then(status => {
    console.log(status);
    db.close();
  });
});
