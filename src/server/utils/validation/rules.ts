// Регулярные выражения для валидации
const REGEX = {
    EMAIL: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    PHONE: /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}-\d{2}$/,
    PHONE_SIMPLE: /^\+7\d{10}$/,
    TELEGRAM: /^@([a-zA-Z0-9_]+)$/,
    TELEGRAM_LINK: /^(https?:\/\/)?(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/,
    VK: /^(https?:\/\/)?vk\.com\/[a-zA-Z0-9_.]+$/,
    URL: /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
    NAME: /^[а-яА-ЯёЁa-zA-Z\s\-']+$/,
    PASSWORD_UPPERCASE: /[A-Z]/,
    PASSWORD_DIGIT: /[0-9]/,
    PASSWORD_SPECIAL: /[!@#$%^&*()_+{}'":;[\]]/
};

/**
 * Основной класс валидации
 */
export class Validator {
    /**
     * Валидация email
     */
    static validateEmail(email: string, required: boolean = false): void {
        if (required && !email) {
            throw createError({
                statusCode: 400,
                message: 'Email обязателен для заполнения',
                statusMessage: 'Email обязателен для заполнения'
            });
        }

        if (email && !REGEX.EMAIL.test(email)) {
            throw createError({
                statusCode: 400,
                message: 'Неверный формат электронной почты',
                statusMessage: 'Неверный формат электронной почты'
            });
        }
    }

    /**
     * Валидация пароля
     */
    static validatePassword(password: string, required: boolean = false): void {
        if (required && !password) {
            throw createError({
                statusCode: 400,
                message: 'Пароль обязателен',
                statusMessage: 'Пароль обязателен'
            });
        }

        if (password) {
            if (password.length < 8) {
                throw createError({
                    statusCode: 400,
                    message: 'Длина пароля должна превышать 7 символов',
                    statusMessage: 'Длина пароля должна превышать 7 символов'
                });
            }

            if (!REGEX.PASSWORD_UPPERCASE.test(password)) {
                throw createError({
                    statusCode: 400,
                    message: 'Пароль должен содержать минимум одну заглавную букву',
                    statusMessage: 'Пароль должен содержать минимум одну заглавную букву'
                });
            }

            if (!REGEX.PASSWORD_DIGIT.test(password)) {
                throw createError({
                    statusCode: 400,
                    message: 'Пароль должен содержать минимум одну цифру',
                    statusMessage: 'Пароль должен содержать минимум одну цифру'
                });
            }

            if (!REGEX.PASSWORD_SPECIAL.test(password)) {
                throw createError({
                    statusCode: 400,
                    message: 'Пароль должен содержать минимум один спец. символ',
                    statusMessage: 'Пароль должен содержать минимум один спец. символ'
                });
            }
        }
    }

    /**
     * Валидация имени/фамилии
     */
    static validateName(name: string, fieldName: string, required: boolean = false): void {
        if (required && !name) {
            throw createError({
                statusCode: 400,
                message: `${fieldName} обязательно для заполнения`,
                statusMessage: `${fieldName} обязательно для заполнения`
            });
        }

        if (name) {
            if (name.length < 2) {
                throw createError({
                    statusCode: 400,
                    message: `${fieldName} должно содержать минимум 2 символа`,
                    statusMessage: `${fieldName} должно содержать минимум 2 символа`
                });
            }

            if (name.length > 50) {
                throw createError({
                    statusCode: 400,
                    message: `${fieldName} должно содержать максимум 50 символов`,
                    statusMessage:  `${fieldName} должно содержать максимум 50 символов`
                });
            }

            if (!REGEX.NAME.test(name)) {
                throw createError({
                    statusCode: 400,
                    message: `${fieldName} может содержать только буквы, пробелы и дефисы`,
                    statusMessage: `${fieldName} может содержать только буквы, пробелы и дефисы`
                });
            }
        }
    }

    /**
     * Валидация телефона
     */
    static validatePhone(phone: string): void {
        if (phone) {
            const phoneSimple = phone.replace(/\s/g, '');
            if (!REGEX.PHONE.test(phone) && !REGEX.PHONE_SIMPLE.test(phoneSimple)) {
                throw createError({
                    statusCode: 400,
                    message: 'Введите номер телефона в формате +7 (999) 123-45-67',
                    statusMessage: 'Введите номер телефона в формате +7 (999) 123-45-67'
                });
            }
        }
    }

    /**
     * Валидация Telegram
     */
    static validateTelegram(telegram: string): void {
        if (telegram) {
            if (!REGEX.TELEGRAM.test(telegram) && !REGEX.TELEGRAM_LINK.test(telegram)) {
                throw createError({
                    statusCode: 400,
                    message: 'Telegram должен быть в формате @username или ссылкой на Telegram',
                    statusMessage: 'Telegram должен быть в формате @username или ссылкой на Telegram'
                });
            }
        }
    }

    /**
     * Валидация VK
     */
    static validateVK(vk: string): void {
        if (vk && !REGEX.VK.test(vk)) {
            throw createError({
                statusCode: 400,
                message: 'ВКонтакте должен быть в формате https://vk.com/username',
                statusMessage: 'ВКонтакте должен быть в формате https://vk.com/username'
            });
        }
    }

    /**
     * Валидация URL
     */
    static validateURL(url: string, fieldName: string = 'Ссылка'): void {
        if (url && !REGEX.URL.test(url)) {
            throw createError({
                statusCode: 400,
                message: `${fieldName} имеет неверный формат`,
                statusMessage: `${fieldName} имеет неверный формат`
            });
        }
    }

    /**
     * Валидация числа (положительное)
     */
    static validatePositiveNumber(value: number, fieldName: string): void {
        if (value !== undefined && value !== null) {
            if (typeof value !== 'number' || isNaN(value)) {
                throw createError({
                    statusCode: 400,
                    message: `${fieldName} должно быть числом`,
                    statusMessage: `${fieldName} должно быть числом`
                });
            }

            if (value < 0) {
                throw createError({
                    statusCode: 400,
                    message: `${fieldName} не может быть отрицательным`,
                    statusMessage: `${fieldName} не может быть отрицательным`
                });
            }
        }
    }

    /**
     * Валидация обязательного поля
     */
    static validateRequired(value: any, fieldName: string): void {
        if (value === undefined || value === null || value === '') {
            throw createError({
                statusCode: 400,
                message: `Поле "${fieldName}" обязательно для заполнения`,
                statusMessage: `Поле "${fieldName}" обязательно для заполнения`
            });
        }

        if (Array.isArray(value) && value.length === 0) {
            throw createError({
                statusCode: 400,
                message: `Поле "${fieldName}" не может быть пустым`,
                statusMessage: `Поле "${fieldName}" не может быть пустым`
            });
        }
    }

    /**
     * Валидация длины строки
     */
    static validateLength(value: string, fieldName: string, min?: number, max?: number): void {
        if (value) {
            if (min !== undefined && value.length < min) {
                throw createError({
                    statusCode: 400,
                    message: `Поле "${fieldName}" должно содержать минимум ${min} символов`,
                    statusMessage: `Поле "${fieldName}" должно содержать минимум ${min} символов`
                });
            }

            if (max !== undefined && value.length > max) {
                throw createError({
                    statusCode: 400,
                    message: `${fieldName} должно содержать максимум ${max} символов`,
                    statusMessage: `${fieldName} должно содержать максимум ${max} символов`
                });
            }
        }
    }

    /**
     * Валидация даты
     */
    static validateDate(dateString: string, fieldName: string = 'Дата'): void {
        if (dateString) {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw createError({
                    statusCode: 400,
                    message: `${fieldName} имеет неверный формат`,
                    statusMessage: `${fieldName} имеет неверный формат`
                });
            }
        }
    }

    /**
     * Валидация статуса пользователя
     */
    static validateUserStatus(status: string): void {
        const allowedStatuses = ['unconfirmed', 'active', 'suspended', 'banned', 'deleted'];

        if (status && !allowedStatuses.includes(status)) {
            throw createError({
                statusCode: 400,
                message: `Недопустимый статус пользователя. Допустимые значения: ${allowedStatuses.join(', ')}`,
                statusMessage: `Недопустимый статус пользователя. Допустимые значения: ${allowedStatuses.join(', ')}`
            });
        }
    }

    /**
     * Валидация контактных данных
     */
    static validateContactMethods(contactMethods: Record<string, any>): void {
        if (contactMethods && typeof contactMethods === 'object') {
            if (contactMethods.phone) {
                this.validatePhone(contactMethods.phone);
            }

            if (contactMethods.telegram) {
                this.validateTelegram(contactMethods.telegram);
            }

            if (contactMethods.whatsapp) {
                this.validatePhone(contactMethods.whatsapp);
            }

            if (contactMethods.vkontakte) {
                this.validateVK(contactMethods.vkontakte);
            }
        }
    }

    /**
     * Проверка что есть хотя бы одно поле для обновления
     */
    static validateAtLeastOneField(data: Record<string, any>, allowedFields: string[]): void {
        const hasFields = allowedFields.some(field =>
            data[field] !== undefined && data[field] !== null && data[field] !== ''
        );

        if (!hasFields) {
            throw createError({
                statusCode: 400,
                message: 'Не указаны данные для обновления'
            });
        }
    }
}