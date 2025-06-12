// migrations/20250428162904-add_email_to_users.mjs
/**
 * Миграция для добавления столбца email в таблицу users.
 * Описание можно разместить здесь.
 */

export async function up(data) {
    try {

        /*const {queryInterface, Sequelize, sequelize} = data.context

        await queryInterface.addColumn('users', 'city', {
            type: Sequelize.STRING, // Используем DataTypes.STRING
            allowNull: true,
            unique: true,
        });
        console.log("Миграция up: email добавлен");*/

    }  catch (error) {
        console.error("Ошибка при выполнении миграции up:", error);
        throw error; // Важно: Пробрасываем ошибку, чтобы umzug знал, что миграция не удалась
    }
}

/**
 * Миграция для удаления столбца email из таблицы users.
 * Описание можно разместить здесь.
 */
export async function down(queryInterface, Sequelize) {
    try {
       // await queryInterface.removeColumn('users', 'email');
    } catch (error) {
        console.error("Ошибка при выполнении миграции down:", error);
        throw error; // Важно: Пробрасываем ошибку, чтобы umzug знал, что миграция не удалась
    }
}
