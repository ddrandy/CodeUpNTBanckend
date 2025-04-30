const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Order, { foreignKey: 'userId' });
        }
    }

    User.init({
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        indexes: [
            { fields: ['email'], unique: true },
        ],
    });
    return User;
};
