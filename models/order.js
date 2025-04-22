const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            this.belongsTo(models.User);
        }
    }

    Order.init({
        total: { type: DataTypes.FLOAT, allowNull: false },
    }, { sequelize });
    return Order;
};
