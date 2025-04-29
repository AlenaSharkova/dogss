import dotenv from 'dotenv';
dotenv.config();
if (dotenv.error) {
  console.error("Ошибка при загрузке переменных окружения из .env:", dotenv.error);
  // Можно выбросить ошибку или использовать значения по умолчанию
}

console.log("POSTGRES_USER:", process.env.POSTGRES_USER);
console.log("POSTGRES_PASSWORD:", process.env.POSTGRES_PASSWORD);
console.log("POSTGRES_DATABASE:", process.env.POSTGRES_DATABASE);
console.log("POSTGRES_HOST:", process.env.POSTGRES_HOST);
console.log("POSTGRES_PORT:", parseInt(process.env.POSTGRES_PORT || '5432', 10));
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE;
const host = process.env.POSTGRES_HOST;
const port = parseInt(process.env.POSTGRES_PORT || '5432', 10); // Использовать || вместо конкатенации строк

if (!user || !password || !database) { // Использовать || (ИЛИ) вместо  (побитовое И)
  throw new Error("Отсутствуют обязательные переменные окружения PostgreSQL.");
}

const config = {
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
    database: database, // Используйте шаблонную строку для конкатенации
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
    //При необходимости настройте пул подключений для производства
    pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
    }
  },
};

export default config;
