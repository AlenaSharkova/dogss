import {Validator} from "~/server/utils/validation/rules";

/**
 * Специализированная валидация для объявлений
 */
export class AdValidator {
    /**
     * Валидация данных для создания объявления
     */
    static validateCreate(data: any): void {
        Validator.validateRequired(data.title, 'Название');
        Validator.validateLength(data.title, 'Название', 10, 200);

        Validator.validateRequired(data.description, 'Описание');
        Validator.validateLength(data.description, 'Описание', 20, 2000);

        Validator.validateRequired(data.breed_id, 'Порода');
        Validator.validatePositiveNumber(data.breed_id, 'Порода');

        Validator.validateRequired(data.city_id, 'Город');
        Validator.validatePositiveNumber(data.city_id, 'Город');

        Validator.validateRequired(data.region_id, 'Регион');
        Validator.validatePositiveNumber(data.region_id, 'Регион');

        if (data.price !== undefined) {
            Validator.validatePositiveNumber(data.price, 'Цена');
        }
    }

    /**
     * Валидация данных для обновления объявления
     */
    static validateUpdate(data: any): void {
        const allowedFields = [
            'title', 'description', 'price', 'breed_id',
            'city_id', 'region_id', 'status'
        ];

        Validator.validateAtLeastOneField(data, allowedFields);

        if (data.title !== undefined) {
            Validator.validateLength(data.title, 'Название', 10, 200);
        }

        if (data.description !== undefined) {
            Validator.validateLength(data.description, 'Описание', 20, 2000);
        }

        if (data.price !== undefined) {
            Validator.validatePositiveNumber(data.price, 'Цена');
        }

        if (data.breed_id !== undefined) {
            Validator.validatePositiveNumber(data.breed_id, 'Порода');
        }

        if (data.city_id !== undefined) {
            Validator.validatePositiveNumber(data.city_id, 'Город');
        }

        if (data.region_id !== undefined) {
            Validator.validatePositiveNumber(data.region_id, 'Регион');
        }

        if (data.status !== undefined) {
            const allowedStatuses = ['draft', 'active', 'sold', 'archived', 'rejected'];
            if (!allowedStatuses.includes(data.status)) {
                throw createError({
                    statusCode: 400,
                    message: `Недопустимый статус объявления. Допустимые значения: ${allowedStatuses.join(', ')}`
                });
            }
        }
    }
}