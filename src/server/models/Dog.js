const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Dogs', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        breeder_id: {
            type: DataTypes.INTEGER,
        },
        photos: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
        },
        date_birth: {
            type: DataTypes.DATE,
        },
        breed_id: {
            type: DataTypes.INTEGER,
        },
        gender: {
            type: DataTypes.TEXT,
        },
        approximate_age: {
            type: DataTypes.TEXT,
        },
    }, {
        tableName: 'dogs',
        timestamps: false
        //добавить created date
    })
};