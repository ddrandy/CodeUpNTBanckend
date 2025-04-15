import { createServer } from 'http';
let products = [
  { 'product_id': 1, 'name': 'Hat', 'price': 12 },
  { 'product_id': 2, 'name': 'Gloves', 'price': 18 },
  { 'product_id': 3, 'name': 'Glasses', 'price': 22 },
];
createServer((req, res) => {
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
  } else if (req.url.startsWith('/products')) {
    if (req.method === 'GET') {
      res.writeHead(200, { "Content-Type": 'application/json' })
      res.end(JSON.stringify(products))
    } else if (req.method === 'POST') {
      res.writeHead(200, { "Content-Type": 'application/json' })
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', ()=>{
        products.push(JSON.parse(body));
        res.end(JSON.stringify(products));
      })
    }
  }
}).listen(3001);

console.log('Server running on port 3001');
