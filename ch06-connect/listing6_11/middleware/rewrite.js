var url = require('url');

function findPostIdBySlug(slug, cb) {
  var posts = {
    hello: 1
  };
  var post = posts[slug];

  cb(!post ? new Error('Post not found') : null, post);
}

function rewrite(req, res, next) {
  var path = url.parse(req.url).pathname;
  var match = path.match(/^\/blog\/posts\/(.+)/)
  if (match) {
    findPostIdBySlug(match[1], function(err, id) {
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
