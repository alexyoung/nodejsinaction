const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/articles')
  .then(db  => {
    console.log('Client ready');

    const article = {
      title: 'I like cake',
      content: 'It is quite good.'
    };
    db.collection('articles')
      .insertOne(article)
      .then(result => {
        console.log(result.insertedId);
        console.log(article._id);
        db.close();
      });
  }, console.error);
