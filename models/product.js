const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Model {
        static associate(models) {
            this.hasMany(models.OrderItem, { foreignKey: 'productId' });
        }
    }

    Product.init({
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
    }, {
        sequelize,
        indexes: [
            { fields: ['name'] },
            { fields: ['price'] },
        ]
    });
    return Product;
};
