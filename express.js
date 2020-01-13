const express = require('express');
const crypto = require('crypto');
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