const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>About</title>
        </head>
        <body>
          <p>This project is a backend for an online shopping mall ... , built with Node.js.</p>
        </body>
      </html>
      `);
  }
}).listen(3001);

console.log('Server running on port 3001');
