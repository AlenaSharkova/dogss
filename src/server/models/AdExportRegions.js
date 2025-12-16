const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('BreedSpecialise', {
        ad_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        tableName: 'ad_export_regions',
        timestamps: false,
    });
};