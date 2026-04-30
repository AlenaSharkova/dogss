import {Validator} from "~/server/utils/validation/rules";
import {queryOtp, queryTokenLink, searchOtp} from "~/server/struct/OtpStruct";

/**
 * Специализированная валидация для объявлений
 */
export class TokenValidator {
    /**
     * Валидация данных для создания объявления
     */
    static validateOtp(data: searchOtp): void {
        Validator.validateRequired(data.otp, 'Otp');
        Validator.validateLength(data.otp, 'Otp', 6, 6);
    }
    static validateTokenLink(data: queryTokenLink): void {
        Validator.validateRequired(data.tokenLink, 'Ссылка');
        Validator.validateLength(data.tokenLink, 'Ссылка', 45, 60);
    }
}