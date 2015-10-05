const url = require('url');

function findPostIdBySlug(slug, cb) {
  const posts = {
    hello: 1
  };
  const post = posts[slug];

  cb(!post ? new Error('Post not found') : null, post);
}

function rewrite(req, res, next) {
  const path = url.parse(req.url).pathname;
  const match = path.match(/^\/blog\/posts\/(.+)/)
  if (match) {
    findPostIdBySlug(match[1], (err, id) => {
      if (err) return next(err);
      if (!id) return next(new Error('User not found'));
      req.url = '/blog/posts/' + id;
      next();
    });
  } else {
    next();
  }
}

module.exports = rewrite;
