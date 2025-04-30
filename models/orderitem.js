const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OrderItem extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'orderId' });
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  OrderItem.init({
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  }, { sequelize });

  return OrderItem
};