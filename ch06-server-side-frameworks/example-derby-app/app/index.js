const app = module.exports = require('derby').createApp('hello', __filename);
app.loadViews(__dirname);

// Routes render on client as well as server
app.get('/', (page, model) => {
  // Subscribe specifies the data to sync
  const message = model.at('hello.message');
  message.subscribe(err => {
    if (err) return next(err);
    message.createNull('');
    page.render();
  });
});
