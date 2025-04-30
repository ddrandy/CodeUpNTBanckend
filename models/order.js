const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'userId' });
            this.hasMany(models.OrderItem, { foreignKey: 'orderId' });
        }
    }

    Order.init({
        total: { type: DataTypes.FLOAT, allowNull: false },
    }, { sequelize });
    return Order;
};
