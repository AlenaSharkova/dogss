// migrations/index.js
import { Sequelize, DataTypes } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import config from '../config/config.js';  // Путь к вашему config.js
import path from 'path';
import { fileURLToPath } from 'url';

console.log('index');

const __filename = fileURLToPath(import.meta.url);
console.log('index 1', __filename);

const __dirname = path.dirname(__filename);
console.log('index 2', __dirname);


const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
console.log('index 3', dbConfig,  path.join(__dirname, '*.mjs'),  path.resolve(__dirname, '*.mjs'));

export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false // Отключите ведение журнала, если хотите
});

export const umzug = new Umzug({
    migrations: {
        glob: "migrations/*.mjs", // Шаблон для поиска файлов миграций (важно: .mjs!)
        /*resolve: async ({name, path, context}) => {

            console.log('Найдена миграция:', name);
            console.log('path:', path);
            const fileUrl = new URL('file:///' + path).href;  // Преобразуем в URL
            console.log('fileUrl', fileUrl);
            let migration = ''
            await import(fileUrl).then(res => {
                migration = res
            }).catch(err => console.log(err))
            console.log('migration:', migration, migration.up, '00');
            return {
                name,
                up: (params) => migration.up(context, Sequelize, params),
                down: (params) => migration.down(context, Sequelize, params),
            };
            return {
                name,
                up: async (params) => (await migration).then(m => m.up(context, Sequelize, params)),
                down: async (params) => (await migration).then(m => m.down(context, Sequelize, params)),
            };
        },*/
    },
    context: {
        queryInterface: sequelize.getQueryInterface(),
        Sequelize: sequelize.constructor, // **ОЧЕНЬ ВАЖНО!** Передаем конструктор Sequelize
        sequelize: sequelize, // Опционально, если нужен экземпляр
    },
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});
//umzug.run({to: 'up'}).catch(console.error)
//await umzug.up()

(async () => {
    // Проверяем соединение
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})();