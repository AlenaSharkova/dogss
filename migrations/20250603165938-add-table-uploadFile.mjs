// migrations/20250428162904-add_email_to_users.mjs
import {DataTypes} from "sequelize";

/**
 • Миграция для добавления столбца email в таблицу users.
 • Описание можно разместить здесь.
 */

export async function up(data) {
  try {
    const {queryInterface, Sequelize} = data.context;

    await queryInterface.createTable('uploaded-file', {
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
