const { Sequelize, DataTypes } = require('sequelize');
const setupUser = require('./user');
const setupProduct = require('./product');
const setupOrder = require('./order');
const setupOrderItem = require('./orderitem');
const config = require('../util/config');

const sequelize = new Sequelize(config.sequelize);

// initialize models
const User = setupUser(sequelize);
const Product = setupProduct(sequelize);
const Order = setupOrder(sequelize);
const OrderItem = setupOrderItem(sequelize);

// define relationships
User.associate({ Order });
Order.associate({ User });
OrderItem.associate({ Order, Product });

module.exports = {
    sequelize,
    User,
    Product,
    Order,
    OrderItem,
};