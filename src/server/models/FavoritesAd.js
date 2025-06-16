const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('FavoritesAd', {
        ad_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,

            references: {
                model: 'ad_list', // Предполагается, что таблица объявлений называется 'ad_lists'
                key: 'id', // Предполагается, что первичный ключ в таблице ad_lists называется 'id'
            },
            onUpdate: 'CASCADE', // Обновление ad_id в favorites_ad при изменении id в ad_lists
            onDelete: 'CASCADE', // Удаление записи из favorites_ad при удалении объявления из ad_lists
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'users', // Таблица пользователей
                key: 'id', // Первичный ключ в таблице users
            },
            onUpdate: 'CASCADE', // Обновление user_id в favorites_ad при изменении id в users
            onDelete: 'CASCADE', // Удаление записи из favorites_ad при удалении пользователя из users
        },
        createdAt: {  // Добавление createdAt и updatedAt
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('NOW()'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('NOW()'),
        },
    }, {
        tableName: 'favorites_ad',
    });
};