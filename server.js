const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./util/config');
const port = config.app.port;

const v1ProductRouters = require('./routes/v1/products');
const v2ProductRouters = require('./routes/v2/products');
const v2AuthRouters = require('./routes/v2/auth');
const v2OrderRouters = require('./routes/v2/orders');

const { sequelize, User, Product, Order } = require('./models');

// sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

const swaggerSpec = swaggerJSDoc(config.swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use('/api/v1/products', v1ProductRouters);
app.use('/api/v2/products', v2ProductRouters);
app.use('/api/v2/auth', v2AuthRouters);
app.use('/api/v2/orders', v2OrderRouters);

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

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map(e => e.message)
    });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});