const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Breeders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        photo_banner: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        photos_gallery: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
        my_dogs: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
        },
    }, {
        tableName: 'breeders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    })
};