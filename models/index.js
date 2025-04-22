const { Sequelize, DataTypes } = require('sequelize');
const Product = require('./product');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// initialize models
Product(sequelize);

module.exports = sequelize;