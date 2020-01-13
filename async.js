const https = require('https');

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

// Executed on OS level, have approx the same execution time
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();