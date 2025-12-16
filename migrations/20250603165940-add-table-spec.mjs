// migrations/20250428162904-add_email_to_users.mjs
import {DataTypes} from "sequelize";

/**
 • Миграция для добавления столбца email в таблицу users.
 • Описание можно разместить здесь.
 */

export async function up(data) {
  try {
    const {queryInterface, Sequelize} = data.context;

    await queryInterface.createTable('breed_specialise', {
      breeder_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
      },
      breed_specialise_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    }, {
      tableName: 'breed_specialise',
      timestamps: false,
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
