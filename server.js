const express = require('express');

const app = express();
app.get('/', (req, res) => { res.send('Hello world!') });
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html')
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found.' });
});

let products = [
  { 'product_id': 1, 'name': 'Hat', 'price': 12 },
  { 'product_id': 2, 'name': 'Gloves', 'price': 18 },
  { 'product_id': 3, 'name': 'Glasses', 'price': 22 },
];
app.get('/products', (req, res) => {
  res.json(products)
});
app.listen(3000, () => { console.log("Server running on http://localhost:3000") });