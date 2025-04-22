const { Sequelize, DataTypes } = require('sequelize');
const setupUser = require('./user');
const setupProduct = require('./product');
const setupOrder = require('./order');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// initialize models
const User = setupUser(sequelize);
const Product = setupProduct(sequelize);
const Order = setupOrder(sequelize);

// define relationships
User.associate({ Order });
Order.associate({ User });

module.exports = {
    sequelize,
    User,
    Product,
    Order,
};