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
        new_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        region: {
            type: DataTypes.INTEGER,
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
        person_ads: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
        },
        contact_methods: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        person_favorites: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
            where: {
                status: {
                    [Sequelize.Op.in]: ['active', 'archive']
                }
            },
            required: false
        },
    }, {
        tableName: 'users',
        timestamps: false,
    })
};