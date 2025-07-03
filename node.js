const http = require('http');
const fs = require('fs');
const url = require('url');

// ❌ Hardcoded secret (security issue)
const DB_PASSWORD = '123456';

// ❌ Deprecated API usage
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// ❌ Unvalidated input (security: potential command injection)
const { exec } = require('child_process');
const userInput = 'ls'; // simulated user input
exec('bash -c "' + userInput + '"', (err, stdout, stderr) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(stdout);
});

// ❌ Synchronous file read (performance issue)
const config = fs.readFileSync('config.json', 'utf8');
console.log(config);

// ❌ Unused variable (code quality)
let unusedVar = 42;

// ❌ Logic bug (condition always false)
let age = 20;
if (age > 100 && age < 0) {
  console.log('Invalid age');
}

// ✅ HTTP Server (OK)
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
