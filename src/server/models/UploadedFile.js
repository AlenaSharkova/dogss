const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('UploadedFile', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        typeFile: {
            type: DataTypes.TEXT,
        },
        purpose: {
            type: DataTypes.TEXT,
        },
        source_id: {
            type: DataTypes.INTEGER,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        coordinates: {
            type: DataTypes.JSON,
        },
        positionBanner: {
            type: DataTypes.JSON,
        },
    }, {
        tableName: 'uploaded-file',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    })
};