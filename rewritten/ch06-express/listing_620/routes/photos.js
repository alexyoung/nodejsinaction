'use strict';
let photos = [];
const Photo = require('../models/Photo');
const path = require('path');
const fs = require('fs');
const join = path.join;

photos.push({
  name: 'Node.js Logo',
  path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
  name: 'Ryan Speaking',
  path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.index = (req, res) => {
  Photo.find({}, (err, photos) => {
    if (err) return next(err);
    res.render('photos', {
      title: 'Photos',
      photos: photos
    });
  });
};

exports.form = function(req, res) {
 res.render('photos/upload', {
   title: 'Photo upload'
 });
};

exports.submit = (req, res, next) => {
  let dir = req.app.get('photos');
  let img = req.files.photo.image;
  let name = req.body.photo.name || img.name;
  let path = join(dir, img.name);
  fs.rename(img.path, path, (err) => {
    if (err) return next(err);
    Photo.create({
      name: name,
      path: img.name
    }, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  });
};

exports.download = (req, res, next) => {
  const dir = req.app.get('photos');
  const id = req.params.id;
  Photo.findById(id, function(err, photo) {
    if (err) return next(err);
    if (!photo) res.send(404, 'Photo not found');
    const path = join(dir, photo.path);
    res.download(path);
  });
};
