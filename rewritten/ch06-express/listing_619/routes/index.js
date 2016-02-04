const express = require('express');
const router = express.Router();
const photos = require('./photos');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.get('/', photos.index);
router.get('/upload', photos.form);
router.get('/upload', photos.form);
router.post('/upload', multipartMiddleware, photos.submit);
router.get('/photo/:id/download', photos.download);

module.exports = router;
