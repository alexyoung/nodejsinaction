const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/articles')
  .then(db  => {
    console.log('Client ready');
    db.close();
  }, console.error);
