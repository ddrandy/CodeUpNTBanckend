const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3000;

const productRouters = require('./routes/products');

// logging middleware 
app.use(morgan(':method :url :status :response-time ms'));

// rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later."
});
app.use('/', limiter);

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