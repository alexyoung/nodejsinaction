let photos = [];

photos.push({
  name: 'Node.js Logo',
  path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
  name: 'Ryan Speaking',
  path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.index => (req, res) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  });
};
