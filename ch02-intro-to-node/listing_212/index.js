var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function(id, client) {
  this.clients[id] = client;
  this.subscriptions[id] = function(senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message);
    }
  }
  this.on('broadcast', this.subscriptions[id]);
});
channel.on('leave', function(id) {
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + ' has left.\n');
});
var server = net.createServer(function(client) {
  var id = [client.remoteAddress, client.remotePort].join(':');
  console.log('Client connected:', id);

  channel.emit('join', id, client);

  client.on('data', function(data) {
    data = data.toString();
    channel.emit('broadcast', id, data);
  });

  client.on('close', function() {
    console.log('Client disconnected:', id);
    channel.emit('leave', id);
  });
});
server.listen(8888);
