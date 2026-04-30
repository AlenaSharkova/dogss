import {DatabaseContext} from "~/server/struct/DatabaseStruct";

/**
 * Получение моделей из контекста с проверкой
 */
export function getDatabaseContext(event: any): DatabaseContext {
    const {
        sequelize,
        Users,
        GeoCity,
        GeoRegions,
        AdList,
        Breeds,
        Breeders,
        UploadedFile
    } = event.context;

    // Проверяем обязательные модели
    const missingModels = [];
    if (!Users) missingModels.push('Users');
    if (!GeoCity) missingModels.push('GeoCity');
    if (!GeoRegions) missingModels.push('GeoRegions');
    if (!AdList) missingModels.push('AdList');
    if (!Breeders) missingModels.push('Breeders');

    if (missingModels.length > 0) {
        console.error('Missing models in context:', missingModels);
        throw new Error(`Database models not available: ${missingModels.join(', ')}`);
    }

    return {
        sequelize,
        Users,
        GeoCity,
        GeoRegions,
        AdList,
        Breeds,
        Breeders,
        UploadedFile
    };
}