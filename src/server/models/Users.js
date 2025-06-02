const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        photo: {
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
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        region: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'users',
        timestamps: false,
    })
};