// migrations/20250428162904-add_email_to_users.mjs
import {DataTypes} from "sequelize";

/**
 • Миграция для добавления столбца email в таблицу users.
 • Описание можно разместить здесь.
 */

export async function up(data) {
  try {
   /* const {queryInterface, Sequelize} = data.context;

    await queryInterface.createTable('favorites_ad', {
      ad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ad_list', // Предполагается, что таблица объявлений называется 'ad_list'
          key: 'id', // Предполагается, что первичный ключ в таблице ad_list называется 'id'
        },
        onUpdate: 'CASCADE', // Обновление ad_id в favorites_ad при изменении id в ad_list
        onDelete: 'CASCADE', // Удаление записи из favorites_ad при удалении объявления из ad_list
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
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });*/

  } catch (error) {
    console.error("Ошибка при выполнении миграции up:", error);
    throw error; // Важно: Пробрасываем ошибку, чтобы umzug знал, что миграция не удалась
  }
}

/**
 • Миграция для отката изменений (удаления добавленных столбцов и возвращения старого типа)
 */
export async function down(data) {
  try {
    const {queryInterface} = data.context;


    await queryInterface.dropTable('favorites_ad');
  } catch (error) {
    console.error("Ошибка при выполнении миграции down:", error);
    throw error; // Важно: Пробрасываем ошибку, чтобы umzug знал, что миграция не удалась
  }
}
