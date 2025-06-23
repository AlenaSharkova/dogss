const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('AdList', {
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
        price: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.TEXT,
        },
        owner: {
            type: DataTypes.INTEGER,
        },
        photos: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
        },
        breed: {
            type: DataTypes.TEXT,
        },
        date_birth: {
            type: DataTypes.DATE,
        },
        count_image: {
            type: DataTypes.INTEGER,
        },
        breed_id: {
            type: DataTypes.INTEGER,
        },
        type_ad: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        is_export: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        parents_mum: {
            type: DataTypes.INTEGER,
        },
        parents_dad: {
            type: DataTypes.INTEGER,
        },
        region_main: {
            type: DataTypes.INTEGER,
        },
        city_main: {
            type: DataTypes.INTEGER,
        },
        gender: {
            type: DataTypes.TEXT,
        },
        quantitative: {
            type: DataTypes.TEXT,
        },
        number_male: {
            type: DataTypes.INTEGER,
        },
        number_female: {
            type: DataTypes.INTEGER,
        },
        approximate_age: {
            type: DataTypes.TEXT,
        },
        is_contractual_price: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        tableName: 'ad_list',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    })
};