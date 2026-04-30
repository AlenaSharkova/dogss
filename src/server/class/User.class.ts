import {DatabaseContextUser} from "~/server/struct/DatabaseStruct";
import {UserBDFirstItemStruct, UserCreateItemStruct} from "~/server/struct/UserStruct";
import {UserValidator} from "~/server/utils/validation/validators/UserValidator";

export class UserClass {
    private models: DatabaseContextUser;
    private userModel: any;

    constructor(models: DatabaseContextUser) {
        this.models = models;
        this.userModel = models.Users;
    }

    /**
     * Получение пользователя по email (без ошибки, возвращает null если нет)
     */
    async getByEmail(email: string): Promise<UserBDFirstItemStruct | null> {
        try {
            UserValidator.validateEmail(email)
        } catch (error) {
            throw error
        }
        try {
            const user = await this.userModel.findOne({
                where: { email }
            });
            return user || null;
        } catch (error) {
            console.error('Error getting user by email:', error);
            return null;
        }
    }

    /**
     * Получение пользователя по ID (с ошибкой если не найден)
     */
    async getById(id: number): Promise<any> {
        try {
            const user = await this.userModel.findByPk(id);

            if (!user) {
                throw createError({
                    statusCode: 404,
                    message: 'Пользователь не найден'
                });
            }

            return user;
        } catch (error: any) {
            // Если это уже createError - прокидываем дальше
            if (error.statusCode) {
                throw error;
            }

            console.error('Error getting user by id:', error);
            throw createError({
                statusCode: 500,
                message: 'Ошибка при получении пользователя'
            });
        }
    }

    /**
     * Создание пользователя
     */
    async create(data: UserCreateItemStruct): Promise<any> {
        try {
            // Проверка email на уникальность
            const existingUser = await this.getByEmail(data.email);
            if (existingUser) {
                throw createError({
                    statusCode: 409,
                    message: 'Пользователь с таким email уже существует'
                });
            }
            //валидация
            UserValidator.validateCreate(data)
            // Создаем пользователя
            return await this.userModel.create({
                email: data.email,
                first_name: data.first_name || null,
                last_name: data.last_name || null,
                status: 'unconfirmed',
                city: data.city || null,
                region: data.region || null,
            });

        } catch (error: any) {
            // Если это Sequelize ошибка валидации
            if (error.name === 'SequelizeValidationError') {
                const messages = error.errors.map((err: any) => err.message).join(', ');
                throw createError({
                    statusCode: 400,
                    message: `Ошибка валидации: ${messages}`
                });
            }

            // Если это уникальное ограничение
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw createError({
                    statusCode: 409,
                    message: 'Пользователь с таким email уже существует'
                });
            }

            // Если уже createError - прокидываем
            if (error.statusCode) {
                throw error;
            }

            console.error('Error creating user:', error);
            throw createError({
                statusCode: 500,
                message: 'Ошибка при создании пользователя'
            });
        }
    }

    /**
     * Обновление пользователя
     */
    async update(id: number, data: {
        //email?: string;
        first_name?: string;
        last_name?: string;
        photo?: string;
        city?: number;
        region?: number;
        contact_methods?: Record<string, any>;
    }): Promise<any> {
        try {
            // Проверяем существование пользователя
            const user = await this.getById(id);


            // Подготавливаем данные для обновления
            const updateData: any = {};

            if (data.first_name !== undefined) updateData.first_name = data.first_name;
            if (data.last_name !== undefined) updateData.last_name = data.last_name;
            if (data.photo !== undefined) updateData.photo = data.photo;
            if (data.city !== undefined) updateData.city = data.city;
            if (data.region !== undefined) updateData.region = data.region;

            // Мерджим контактные данные
            if (data.contact_methods !== undefined) {
                updateData.contact_methods = {
                    ...user.contact_methods,
                    ...data.contact_methods
                };
            }

            // Выполняем обновление
            await this.userModel.update(updateData, { where: { id } });

            // Возвращаем обновленного пользователя
            return await this.getById(id);

        } catch (error: any) {
            // Прокидываем createError дальше
            if (error.statusCode) {
                throw error;
            }

            console.error('Error updating user:', error);
            throw createError({
                statusCode: 500,
                message: 'Ошибка при обновлении пользователя'
            });
        }
    }

    /**
     * Удаление пользователя (мягкое)
     */
    async delete(id: number): Promise<void> {
        try {
            const user = await this.getById(id);

            // Мягкое удаление - меняем статус
            // мой мнение: надо удалить все конфиденциальные данные
            await this.userModel.update(
                { status: 'deleted' },
                { where: { id } }
            );

        } catch (error: any) {
            if (error.statusCode) {
                throw error;
            }

            console.error('Error deleting user:', error);
            throw createError({
                statusCode: 500,
                message: 'Ошибка при удалении пользователя'
            });
        }
    }

    /**
     * Получение профиля пользователя с зависимостями
     */
    async getProfile(id: number): Promise<any> {
        try {
            const user = await this.userModel.findOne({
                where: { id },
                include: [
                    {
                        model: this.models.GeoCity,
                        as: 'LocationUserCity',
                    },
                    {
                        model: this.models.GeoRegions,
                        as: 'LocationUserRegion',
                    },
                    /*{
                        model: this.models.AdList,
                        as: 'UserAdList',
                        where: { status: 'active' },
                        required: false,
                        include: [
                            {
                                model: this.models.Breeds,
                                as: 'Breed',
                                attributes: ['id', 'name']
                            }
                        ]
                    },*/
                    {
                        model: this.models.Breeders,
                        as: 'MyBreeder',
                        required: false
                    }
                ]
            });

            if (!user) {
                throw createError({
                    statusCode: 404,
                    message: 'Пользователь не найден'
                });
            }

            return user;

        } catch (error: any) {
            if (error.statusCode) {
                throw error;
            }

            console.error('Error getting user profile:', error);
            throw createError({
                statusCode: 500,
                message: 'Ошибка при получении профиля'
            });
        }
    }

    /**
     * Изменение статуса пользователя
     */
    async changeStatus(id: number, status: string): Promise<any> {
        try {
            await this.getById(id); // Проверяем существование

            const allowedStatuses = ['unconfirmed', 'active', 'suspended', 'banned', 'deleted'];
            if (!allowedStatuses.includes(status)) {
                throw createError({
                    statusCode: 400,
                    message: 'Недопустимый статус'
                });
            }

            await this.userModel.update(
                { status },
                { where: { id } }
            );

            return await this.getById(id);

        } catch (error: any) {
            if (error.statusCode) {
                throw error;
            }

            console.error('Error changing user status:', error);
            throw createError({
                statusCode: 500,
                message: 'Ошибка при изменении статуса'
            });
        }
    }
}

/**
 * Фабрика для создания User
 */
export class UserFactory {
    static createFromContext(event: any): UserClass {
        const {
            Users,
            sequelize,
            GeoCity,
            GeoRegions,
            AdList,
            Breeds,
            Breeders,
            UploadedFile,
            Otp
        } = event.context;

        if (!Users) {
            throw createError({
                statusCode: 500,
                message: 'Модель Users недоступна'
            });
        }

        const dbContext: DatabaseContextUser = {
            sequelize,
            Users,
            GeoCity: GeoCity || null,
            GeoRegions: GeoRegions || null,
            AdList: AdList || null,
            Breeds: Breeds || null,
            Breeders: Breeders || null,
            UploadedFile:UploadedFile || null,
            Otp: Otp || null
        };

        return new UserClass(dbContext);
    }
}