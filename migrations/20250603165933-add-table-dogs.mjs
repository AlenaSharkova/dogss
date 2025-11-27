// migrations/20250428162904-add_email_to_users.mjs
import {DataTypes} from "sequelize";

/**
 • Миграция для добавления столбца email в таблицу users.
 • Описание можно разместить здесь.
 */

export async function up(data) {
  try {
    const {queryInterface, Sequelize} = data.context;


    await queryInterface.createTable('dogs', {
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
      owner: {
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
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    })

  } catch (error) {
    console.error("Ошибка при выполнении миграции up:", error);
    throw error;
  }
}

/**
 • Миграция для отката изменений (удаления добавленных столбцов и возвращения старого типа)
 */
export async function down(data) {
  try {
    const {queryInterface} = data.context;

    // *** ИСПРАВЛЕНИЕ: Нужно удалить таблицу 'breeders', которую создала 'up' ***
    await queryInterface.dropTable('dogs');
  } catch (error) {
    console.error("Ошибка при выполнении миграции down:", error);
    throw error; // Важно: Пробрасываем ошибку, чтобы umzug знал, что миграция не удалась
  }
}
