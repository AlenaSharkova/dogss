// server/plugins/sequelize.js
import { Sequelize } from 'sequelize';
import breedsModel from '../models/Breeds.js';
import geoRegionsModel from '../models/GeoRegions.js';
import geoCityModel from '../models/GeoCity.js';
import adListModel from '../models/AdList.js';
import adExportRegionsModel from '../models/AdExportRegions.js';
import usersModel from '../models/Users.js';
import otpModel from '../models/Otp.js';

//import config from '/config/config.js';
//const env = process.env.NODE_ENV || 'development';
//const dbConfig = config[env];

export default defineNitroPlugin(async  (nitroApp) => {
    const config = useRuntimeConfig(); // Для доступа к переменным окружения

    console.log('config', config.postgres)
    const sequelize = new Sequelize(
        config.postgres.database,
        config.postgres.user,
        config.postgres.password,
        { username: 'postgres',
            password: 'AsDe159!F8.',
            database: 'postgres',
            host: 'localhost',
            port: '5432',
            dialect: 'postgres',}

    );

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // Инициализируем модели
    const Breeds = breedsModel(sequelize);
    const GeoRegions = geoRegionsModel(sequelize);
    const GeoCity = geoCityModel(sequelize);
    const AdList = adListModel(sequelize);
    const Users = usersModel(sequelize);
    const AdExportRegions = adExportRegionsModel(sequelize);
    const Otp = otpModel(sequelize);

    // Определение связей Many-to-Many
    AdList.belongsToMany(GeoRegions, {
        through: AdExportRegions, // Используем связующую таблицу
        foreignKey: 'ad_id',      // Внешний ключ в AdExportRegions, ссылающийся на AdList
        otherKey: 'region_id',     // Внешний ключ в AdExportRegions, ссылающийся на GeoRegions
        as: 'ExportRegions'          // Алиас для связи
    });
    GeoRegions.belongsToMany(AdList, {
        through: AdExportRegions, // Используем связующую таблицу
        foreignKey: 'region_id',     // Внешний ключ в AdExportRegions, ссылающийся на GeoRegions
        otherKey: 'ad_id',      // Внешний ключ в AdExportRegions, ссылающийся на AdList
        as: 'AdListExport'              // Алиас для связи
    });

    GeoRegions.hasMany(AdList, {
        foreignKey: 'region_main',
        as: 'AdListLocation'
    });

    // Определение связи One-to-Many для региона нахождения
    AdList.belongsTo(GeoRegions, {
        foreignKey: 'region_main',
        as: 'LocationRegion'
    });
    AdList.belongsTo(Breeds, {
        foreignKey: 'breed_id',
        as: 'Breed'
    });
    AdList.belongsTo(GeoCity, {
        foreignKey: 'city_main',
        as: 'LocationCity'
    });
    AdList.belongsTo(Users, {
        foreignKey: 'owner',
        as: 'Owner'
    });
    Otp.belongsTo(Users, { foreignKey: 'userId' });


    await sequelize.sync({ force: false }); //  force: false - не трогает существующие данные
    nitroApp.hooks.hook('request', (event) => {
        event.context.sequelize = sequelize;
        event.context.Breeds = Breeds;
        event.context.GeoRegions = GeoRegions;
        event.context.GeoCity = GeoCity;
        event.context.AdList = AdList;
        event.context.Users = Users;
        event.context.AdExportRegions = AdExportRegions;
        event.context.Otp = Otp;
        console.log('model and sequelize added to context');
    });
   return {
        provide: {
            sequelize,
            Breeds,
            GeoRegions,
            GeoCity,
            AdList,
            Users,
            Otp
        },
    };
});
