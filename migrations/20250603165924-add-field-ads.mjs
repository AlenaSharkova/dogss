// migrations/20250428162904-add_email_to_users.mjs
import {DataTypes} from "sequelize";

/**
 • Миграция для добавления столбца email в таблицу users.
 • Описание можно разместить здесь.
 */

export async function up(data) {
  try {
    const {queryInterface, Sequelize} = data.context;

    await queryInterface.addColumn('ad_list', 'number_male', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('ad_list', 'number_female', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('ad_list', 'approximate_age', {
      type: DataTypes.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('ad_list', 'is_contractual_price', {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    });

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
