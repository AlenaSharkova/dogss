const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('GeoRegions', {
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
        tableName: 'geo_regions',
        timestamps: false,
    });

};