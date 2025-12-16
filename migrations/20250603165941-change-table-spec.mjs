// migrations/20250428162904-add_email_to_users.mjs
import {DataTypes} from "sequelize";

/**
 • Миграция для добавления столбца email в таблицу users.
 • Описание можно разместить здесь.
 */

export async function up(data) {
  try {
    const {queryInterface, Sequelize} = data.context;

    await queryInterface.removeColumn('breed_specialise', 'user_id', {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    });
    await queryInterface.addColumn('breed_specialise', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    });
    await queryInterface.removeColumn('breed_specialise', 'breeder_id', {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    });
    await queryInterface.addColumn('breed_specialise', 'breeder_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    });

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


    //await queryInterface.dropTable('favorites_ad');
  } catch (error) {
    console.error("Ошибка при выполнении миграции down:", error);
    throw error; // Важно: Пробрасываем ошибку, чтобы umzug знал, что миграция не удалась
  }
}
