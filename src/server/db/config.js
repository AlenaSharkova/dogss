require('dotenv').config(); // Загрузите переменные окружения из файла .env (если вы его используете)

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE;
const host = process.env.POSTGRES_HOST;
const port = parseInt(process.env.POSTGRES_PORT || '5432', 10);

if (!user || !password || !database) {
  throw new Error("Отсутствуют обязательные переменные окружения PostgreSQL.");
}

module.exports = {
  development: {
    username: user,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: 'postgres',
  },
  test: { // Добавьте конфигурацию тестовой среды
    username: user,
    password: password,
    database: `${database}_test`, // Используйте отдельную тестовую базу данных
    host: host,
    port: port,
    dialect: 'postgres',
    logging: false, // Отключите ведение журнала в тестовой среде
  },
  production: {
    username: user,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: 'postgres',
    // При необходимости настройте пул подключений для производства
    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // }
  },
};