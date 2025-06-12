// migrations/xxxx-delete-specific-user.js

const userEmailToDelete = 'alena.sarkova.16@gmail.com'; // Замените на реальное значение!

export async function up(data) {
  const { queryInterface, Sequelize } = data.context;
  let deletedUserData = null;

  try {
    // 1. Найти пользователя
    /*const users = await queryInterface.sequelize.query(
        `SELECT * FROM users WHERE email = :email`,
        {
          replacements: { email: userEmailToDelete },
          type: Sequelize.QueryTypes.SELECT,
        }
    );

    if (users.length === 0) {
      console.warn(`Пользователь с email ${userEmailToDelete} не найден.  Миграция ничего не делает.`);
      return; // Важно: выходим из функции, если пользователя нет
    }

    deletedUserData = users[0]; // Сохраняем данные пользователя

    // 2. Удалить связанные записи в таблице `otp` (если нужно). Важно удалить связанные записи перед удалением пользователя
    await queryInterface.bulkDelete('otp', { userId: deletedUserData.id }, {});

    // 3. Удалить пользователя
    await queryInterface.bulkDelete('users', { id: deletedUserData.id }, {});

    console.log(`Пользователь с email ${userEmailToDelete} успешно удален.`);
*/
  } catch (error) {
    console.error("Ошибка при выполнении миграции up:", error);
    throw error;
  }
}

export async function down(data) {
  const { queryInterface, Sequelize } = data.context;

  try {
    // Проверяем, что у нас есть данные для восстановления
   /* if (!deletedUserData) {
      console.warn("Нет данных для восстановления пользователя.  Миграция ничего не делает.");
      return;
    }

    // 1. Восстановить пользователя
    await queryInterface.bulkInsert('users', [deletedUserData], {});

    console.log(`Пользователь с email ${userEmailToDelete} успешно восстановлен.`);
    */
  } catch (error) {
    console.error("Ошибка при выполнении миграции down:", error);
    throw error;
  }
}
