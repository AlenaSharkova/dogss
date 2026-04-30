import {DatabaseContextOtp, DatabaseContextUser} from "~/server/struct/DatabaseStruct";
import {UserCreateItemStruct} from "~/server/struct/UserStruct";
import {UserValidator} from "~/server/utils/validation/validators/UserValidator";
import {generateOTP, generateRandomToken} from "~/server/utils/generate";
import {sendOTPByEmail} from "~/server/services/mail.service";
import {Op} from "sequelize";
import {TokenValidator} from "~/server/utils/validation/validators/TokenValidator";
import { searchOtp} from "~/server/struct/OtpStruct";

export class OtpClass {
    private models: DatabaseContextOtp;
    private otpModel: any;
    public otp?: string;
    public tokenLink?: string;

    constructor(models: DatabaseContextOtp) {
        this.models = models;
        this.otpModel = models.Otp;
    }

    /**
     * Получение пользователя по email (без ошибки, возвращает null если нет)
     */
     generateCode() {
        try {
            this.otp = generateOTP();
            this.tokenLink = generateRandomToken();
            if (!this.otp || !this.tokenLink) {
                throw createError({
                    statusCode: 500,
                    message: 'Ошибка генерации opt | token',
                    statusMessage: 'Ошибка создания кода',
                })
            }
        }
        catch (error) {
            throw createError({
                statusCode: 500,
                message: 'Ошибка генерации opt | token',
                statusMessage: 'Ошибка создания кода',
            })
        }
     }

    async sendCodeByEmail(email: string) {
        if (!this.otp || !this.tokenLink) {
            throw createError({
                statusCode: 500,
                message: 'Ошибка генерации opt | token',
                statusMessage: 'Ошибка создания кода',
            })
        }
        try {
            await sendOTPByEmail(email, this.otp, this.tokenLink);
        } catch (error: any) {
            console.error('error sendOTPByEmail', error)
            throw createError({
                statusCode: error.statusCode || 500,
                message: `Ошибка отправления OTP: ${(error.message || '')}`,
                statusMessage: 'Ошибка отправления кода',
                data: {
                    code: 'err-send-otp'
                },
            })
        }
    }
    async destroy(userId: number){
         try {
            await this.otpModel.destroy({where: {userId: userId}});
         } catch (error: any) {
            throw createError({
                statusCode: 500,
                message: `Ошибка удаления  otp: ${(error.message || '')}`,
                statusMessage: 'Не удалось запросить код подтверждения',
            })
         }
    }
    async create(userId: number) {
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Срок действия 3 минут

         try {
            await this.otpModel.create({
                userId: userId,
                otp: this.otp,
                token: this.tokenLink,
                expiresAt: expiresAt,
            });

        } catch (error: any) {
            throw createError({
                statusCode: 500,
                message: `Ошибка удаления  otp: ${(error.message || '')}`,
                statusMessage: 'Не удалось запросить код подтверждения',
            })
        }
     }
     async getByTokenLink(tokenLink: string, is_change_email = false) {
         TokenValidator.validateTokenLink({tokenLink})
         try {
             const OtpWithToken = await this.otpModel.findOne({
                 where: {
                     token: tokenLink,
                     is_change_email
                 }
             });
             if (!OtpWithToken) {
                 throw createError({
                     statusCode: 401,
                     message: 'Токен не найден',
                     statusMessage: 'Ссылка неверна',
                 });
             }
             return OtpWithToken
         } catch (error: any) {
             if (error.statusCode) {
                 throw error;
             }
             throw createError({
                 statusCode: 500,
                 message: 'Ошибка идентификации ссылки',
                 statusMessage: 'Ошибка идентификации ссылки',
             });
         }
     }
     async getByToOtpAndUserId(data: searchOtp, is_change_email = false) {
         TokenValidator.validateOtp(data)
         try {
             const OtpWithToken = await this.otpModel.findOne({
                 where: {
                     otp: data.otp,
                     userId: data.userId,
                     is_change_email
                 }
             });
             if (!OtpWithToken) {
                 throw createError({
                     statusCode: 401,
                     message: 'Неверно введённый код',
                     statusMessage: 'Неверно введённый код',
                 });
             }
         } catch (error: any) {
             if (error.statusCode) {
                 throw error;
             }
             throw createError({
                 statusCode: 500,
                 message: 'Ошибка идентификации ссылки',
                 statusMessage: 'Ошибка идентификации ссылки',
             });
         }
     }
}

/**
 * Фабрика для создания User
 */
export class OtpFactory {
    static createFromContext(event: any): OtpClass {
        const {
            Users,
            sequelize,
            Otp
        } = event.context;

        if (!Otp) {
            throw createError({
                statusCode: 500,
                message: 'Модель Otp недоступна'
            });
        }

        const dbContext: DatabaseContextOtp = {
            sequelize,
            Users,
            Otp: Otp
        };

        return new OtpClass(dbContext);
    }
}