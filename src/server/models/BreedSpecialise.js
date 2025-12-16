const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('BreedSpecialise', {
        breeder_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
        },
        breed_specialise_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
        },
    }, {
        tableName: 'breed_specialise',
        timestamps: false,
    });
};