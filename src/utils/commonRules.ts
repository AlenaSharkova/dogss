export const ruleValidEmail = (value: string) =>
    !value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i) && value
        ? "Неверный формат электронной почты"
        : "";

export const ruleValidUserNikName = (value: string) =>
    !value.match(/^([a-zA-Z0-9._-]{5,}?)$/i) && value
        ? "Неверно введено имя"
        : "";

export const ruleValidPassword = (value: string) => {
    // Проверка длины
    if(value.length < 8) return 'Длина пароля должна превышать 7 символов'

    // Проверка заглавных букв
    if(!value.match(/[A-Z]/g)) return 'Пароль должен содержать минимум одну заглавную букву'

    // Проверка чисел
    if(!value.match(/[0-9]/g)) return 'Пароль должен содержать минимум одну цифру'

    if(!value.match(/[!@#$%^&*()_+{}'":;[\]]/g)) return 'Пароль должен содержать минимум один спец. символ'

    return ''
}


export const ruleCheckCard = (cardNo: string) => {
    let s = 0;
    let doubleDigit = false;
    for (let i = cardNo.length - 1; i >= 0; i--) {
        let digit = +cardNo[i];
        if (doubleDigit) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        s += digit;
        doubleDigit = !doubleDigit;
    }
    return s % 10 == 0 ? "" : "Неверный номер карты";
};
export const ruleNotEmpty = (value: string | number) =>
    !value && "Данное поле не может быть пустым";

export const ruleFieldLength = (value: string) =>
    value.length < 5 && "Данное поле должно содержать не менее 5 символов";
export const ruleFieldLengthAndEmpty = (value: string) =>
    value.length < 5 && value && "Данное поле должно содержать не менее 5 символов";

export const ruleFieldMinLength = (value: string) =>
    value.length < 3 && "Данное поле должно содержать не менее 3 символов";



export const ruleValidNumberPhone = (value: number | string) =>
    !value.toString().match(/^[\d\+][\d\(\)\ -]{4,14}\d$/)
        ? "Введите номер телефона в верном формате"
        : "";

export const ruleValidLinkURL = (value: string) => {
    const URLRegex = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
    return URLRegex.test(value) ? "" : "Вы ввели некорректный URL или адрес ссылки";
};

export const ruleValidClientID = (value: string) =>
    !value.match(/^taxi\/park\//) ? "Client ID должен начинаться с taxi/park/" : "";

export const ruleNumberNotNegative = (value: string) =>
    Number(value) < 0 ? "Число не может быть меньше 0" : "";

//new
export const ruleRegions = (value: string) =>
    !value? "Выберите регион" : "";
