var fs = require('fs');
var events = require('events');
var util = require('util');

util.inherits(Watcher, events.EventEmitter);
module.exports = Watcher;

function Watcher(watchDir, processedDir) {
  this.watchDir = watchDir;
  this.processedDir = processedDir;
}

Watcher.prototype.watch = function() {
  fs.readdir(this.watchDir, function(err, files) {
    if (err) throw err;
    for (var index in files) {
      this.emit('process', files[index]);
    }
  }.bind(this));
};
Watcher.prototype.start = function() {
  fs.watchFile(this.watchDir, function() {
    this.watch();
  }.bind(this));
};
