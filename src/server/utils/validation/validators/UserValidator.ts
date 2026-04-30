import {Validator} from "~/server/utils/validation/rules";
import {UserCreateItemStruct} from "~/server/struct/UserStruct";

/**
 * Специализированная валидация для пользователей
 */
export class UserValidator {
    /**
     * Валидация данных для создания пользователя
     */
    static validateEmail(email: string): void {
        // Обязательные поля
        Validator.validateRequired(email, 'Email');
        Validator.validateEmail(email, true);
    }
    static validateCreate(data: UserCreateItemStruct): void {
        // Обязательные поля
        Validator.validateRequired(data.email, 'Email');
        Validator.validateEmail(data.email, true);

        // Необязательные поля
        if (data.first_name) Validator.validateName(data.first_name, 'Имя');
        if (data.last_name) Validator.validateName(data.last_name, 'Фамилия');
    }

    /**
     * Валидация данных для обновления пользователя
     */
    static validateUpdate(data: any): void {
        const allowedFields = [
            'email', 'first_name', 'last_name', 'photo',
            'address', 'status', 'city', 'region', 'contact_methods'
        ];

        // Проверяем что есть хотя бы одно поле для обновления
        Validator.validateAtLeastOneField(data, allowedFields);

        // Валидируем только те поля, которые есть в данных
        if (data.email !== undefined) {
            Validator.validateEmail(data.email, false);
        }

        if (data.first_name !== undefined) {
            Validator.validateName(data.first_name, 'Имя', false);
        }

        if (data.last_name !== undefined) {
            Validator.validateName(data.last_name, 'Фамилия', false);
        }

        if (data.photo !== undefined) {
            Validator.validateURL(data.photo, 'Фото');
        }

        if (data.status !== undefined) {
            Validator.validateUserStatus(data.status);
        }

        if (data.contact_methods !== undefined) {
            Validator.validateContactMethods(data.contact_methods);
        }
    }

    /**
     * Валидация данных для регистрации
     */
    static validateRegister(data: any): void {
        Validator.validateRequired(data.email, 'Email');
        Validator.validateRequired(data.password, 'Пароль');

        Validator.validateEmail(data.email, true);
        Validator.validatePassword(data.password, true);

        if (data.first_name) Validator.validateName(data.first_name, 'Имя');
        if (data.last_name) Validator.validateName(data.last_name, 'Фамилия');
    }

    /**
     * Валидация данных для входа
     */
    static validateLogin(data: any): void {
        Validator.validateRequired(data.email, 'Email');
        Validator.validateRequired(data.password, 'Пароль');

        Validator.validateEmail(data.email, true);
    }
}