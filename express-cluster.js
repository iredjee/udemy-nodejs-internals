process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');
const crypto = require('crypto');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    // console.time('pbkdf2:1');
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      // console.timeEnd('pbkdf2:1');
      res.send('hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('fast');
  });

  app.listen(3000);
}