'use strict';
const net = require('net');
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    socket.write(data);
  });
});
server.listen(8888);
