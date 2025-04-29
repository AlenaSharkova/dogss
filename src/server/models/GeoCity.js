const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('GeoCity', {
        value: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'geo_city',
        timestamps: false
    });
};