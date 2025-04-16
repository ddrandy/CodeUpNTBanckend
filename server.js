const express = require('express');
const app = express();
const port = 3000;

const productRouters = require('./routes/products');

// express json middleware
app.use(express.json());

// mount the routing module
app.use('/products', productRouters);

// root route
app.get('/', (req, res) => {
  res.send('Welcom to my page');
});

// 404 
app.use((req, res, next) => {
  res.status(404).json({ error: 'Page not found' });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});