// migrations/run.js
import { umzug, sequelize } from './index.js'; // Путь к файлу конфигурации umzug
console.log('command in run 00: ', umzug)

const command = process.argv[2];
console.log('command in run 0: ', command)

async function run() {
    console.log('command in run: ', umzug.up, command)
    try {
        if (command === 'up') {
            console.log('command in run 1: ', command)

            await umzug.up();
            console.log('Все миграции выполнены.');
        } else if (command === 'down') {
            //console.log('command in run: ', umzug.up, command)

            await umzug.down();
            console.log('Откат последней миграции выполнен.');
        } else {
            console.log('Использование: node migrations/run.js [up|down]');
        }
    } catch (error) {
        console.error('Ошибка при выполнении миграции:', error);
    } finally {
        await sequelize.close(); // Закрываем соединение с базой данных после завершения миграции
    }
}

await run();
