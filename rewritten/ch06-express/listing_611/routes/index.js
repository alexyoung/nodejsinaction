var express = require('express');
var router = express.Router();
var photos = require('./photos');

router.get('/', photos.index);

module.exports = router;
