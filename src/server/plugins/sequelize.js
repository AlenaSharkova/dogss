// server/plugins/sequelize.js
import { Sequelize } from 'sequelize';
import breedsModel from '../models/Breeds.js';
import geoRegionsModel from '../models/GeoRegions.js';
import geoCityModel from '../models/GeoCity.js';
import adListModel from '../models/AdList.js';
import adExportRegionsModel from '../models/AdExportRegions.js';
import usersModel from '../models/Users.js';
import otpModel from '../models/Otp.js';
import favoritesAdModel from '../models/FavoritesAd.js';
import breedersModel from '../models/Breeder.js';
import dogsModel from '../models/Dog.js';
import {initEventTgBot} from "~/server/services/telegram.service.js";
import {tokenTgBot} from "~/server/data/access-data.js";
import TelegramBot from "node-telegram-bot-api";

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
    const FavoritesAd = favoritesAdModel(sequelize);
    const Breeders = breedersModel(sequelize);
    const Dogs = dogsModel(sequelize);

    const TelegramBotMain = new TelegramBot(tokenTgBot, { polling: true })
    initEventTgBot(TelegramBotMain)

    // Определение связей Many-to-Many AdExportRegions
    AdList.belongsToMany(GeoRegions, {
        through: AdExportRegions,
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
    // Определение связей Many-to-Many FavoritesAd
    AdList.belongsToMany(Users, {
        through: FavoritesAd,
        foreignKey: 'ad_id',
        otherKey: 'user_id',
        as: 'UsersListFavoriteAd'
    });
    Users.belongsToMany(AdList, {
        through: FavoritesAd,
        foreignKey: 'user_id',
        otherKey: 'ad_id',
        as: 'FavoritesAdList'
    });

    GeoRegions.hasMany(AdList, {
        foreignKey: 'region_main',
        as: 'AdListLocation'
    });

    // Определение связи One-to-Many для региона нахождения
    Users.belongsTo(GeoRegions, {
        foreignKey: 'region',
        as: 'LocationUserRegion'
    });
    Users.belongsTo(GeoCity, {
        foreignKey: 'city',
        as: 'LocationUserCity'
    });
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        as: 'Owner'
    });
    Users.hasMany(AdList, {
        foreignKey: 'owner',
        as: 'UserAdList'
    });
    Breeders.hasMany(Dogs, {
        foreignKey: 'owner',
        as: 'MyDogs'
    });
    Dogs.belongsTo(Breeds, {
        foreignKey: 'breed_id',
        as: 'Breed'
    });

    Otp.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE',  as: 'User' });


    await sequelize.sync({ force: false });
    nitroApp.hooks.hook('request', (event) => {
        event.context.sequelize = sequelize;
        event.context.Breeds = Breeds;
        event.context.GeoRegions = GeoRegions;
        event.context.GeoCity = GeoCity;
        event.context.AdList = AdList;
        event.context.Users = Users;
        event.context.AdExportRegions = AdExportRegions;
        event.context.Otp = Otp;
        event.context.FavoritesAd = FavoritesAd;
        event.context.Breeders = Breeders;
        event.context.Dogs = Dogs;

        event.context.TelegramBotMain = TelegramBotMain;
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
            Otp,
            FavoritesAd,
            Breeders,
            Dogs,
            TelegramBotMain
        },
    };
});
