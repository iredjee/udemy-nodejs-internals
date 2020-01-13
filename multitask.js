const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

console.time('fetch');
function doRequest() {
  https
  .request('https://www.google.com', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.timeLog('fetch');
    });
  })
  .end();
}

console.time('hash');
function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.timeLog('hash');
  });
}

doRequest();

console.time('fs');
fs.readFile('multitask.js', 'utf8', () => {
  console.timeLog('fs');

  setTimeout(() => {
    console.log('timeout');
  }, 0);
  
  // Runs on the following 'tick' of event loop
  // After POLL phase we go to CHECK phase
  // to look for setImmediate callbacks to run
  setImmediate(() => {
    console.log('immediate');

    setImmediate(() => {
      console.log('immediate inside 1');
    });

    fs.readFile('multitask.js', 'utf8', () => {
      console.log('read file inside 1');

      setImmediate(() => {
        console.log('immediate inside 1-1');
      });
    });
  });

  // Runs right after current operation completed
  process.nextTick(() => {
    console.log('next tick');
  });

  console.log('before 2nd read file');
  fs.readFile('multitask.js', 'utf8', () => {
    console.log('2nd read file');
  });

  setTimeout(() => {
    console.log('timeout last');
  }, 0);
});

// doHash();
// doHash();
// doHash();
// doHash();


// setImmediate(() => {
//   console.log('IM');
// });

// setTimeout(() => {
//   console.log('TO');
// }, 0);