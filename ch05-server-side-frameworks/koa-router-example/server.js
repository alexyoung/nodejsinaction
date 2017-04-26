const app = require('koa')();
const router = require('koa-router')();

router
  .post('/pages', function*() {
    this.body = 'Pages';
  })
  .get('/pages/:id', function*() {
    this.body = 'A page';
  })
  .put('pages-update', '/pages/:id', function*() {
    this.body = 'Updated page';
  });

app.use(router.routes());

app.listen(process.env.PORT || 3000);
