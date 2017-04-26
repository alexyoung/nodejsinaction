'use strict';

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const workers = {};
let requests = 0;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    workers[i] = cluster.fork();
    ((i) => {
      workers[i].on('message', (message) => {
        if (message.cmd == 'incrementRequestTotal') {
          requests++;
          for (var j = 0; j < numCPUs; j++) {
            workers[j].send({
              cmd: 'updateOfRequestTotal',
              requests: requests
            });
          }
        }
      });
    })(i);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %s died.', worker.process.pid);
  });
} else {
  process.on('message', (message) => {
    if (message.cmd === 'updateOfRequestTotal') {
      requests = message.requests;
    }
  });
  http.Server((req, res) => {
    res.writeHead(200);
    res.end(`Worker ${process.pid}: ${requests} requests.`);
    process.send({ cmd: 'incrementRequestTotal' });
  }).listen(8000);
}
