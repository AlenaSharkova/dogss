const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Breeds', {
        value: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'breeds',
        timestamps: false,
    });
};