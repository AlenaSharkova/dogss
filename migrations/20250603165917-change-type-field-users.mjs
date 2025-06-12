// migrations/20250428162904-add_email_to_users.mjs
import {DataTypes} from "sequelize";

/**
 • Миграция для добавления столбца email в таблицу users.
 • Описание можно разместить здесь.
 */

export async function up(data) {
  try {
    const {queryInterface, Sequelize, sequelize} = data.context;

    /*await queryInterface.removeColumn('users', 'city', {
      type: DataTypes.INTEGER, //  Укажите желаемую длину строки, если нужно
      allowNull: true,
      // Добавьте другие опции, которые были у столбца ранее, если они важны (например, defaultValue)
    });
    await queryInterface.addColumn('users', 'city', {
      type: DataTypes.INTEGER, //  Укажите желаемую длину строки, если нужно
      allowNull: true,
      // Добавьте другие опции, которые были у столбца ранее, если они важны (например, defaultValue)
    });

    await queryInterface.removeColumn('users', 'region', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'region', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });*/
    console.error(" Выполнении миграции up:");

    await queryInterface.removeColumn('users', 'photo', {
      type: DataTypes.ARRAY,
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
    const {queryInterface, Sequelize, sequelize} = data.context;


    // Возвращаем тип столбца city к TEXT
    await queryInterface.changeColumn('users', 'city', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // Возвращаем тип столбца region к TEXT
    await queryInterface.changeColumn('users', 'region', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    console.log("Миграция down: столбцы удалены и возвращены к старому типу");

  } catch (error) {
    console.error("Ошибка при выполнении миграции down:", error);
    throw error; // Важно: Пробрасываем ошибку, чтобы umzug знал, что миграция не удалась
  }
}
