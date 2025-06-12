import dayjs, {Dayjs} from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

//let customParseFormat = require('dayjs/plugin/customParseFormat')
//dayjs.extend(customParseFormat)

//let duration = require("dayjs/plugin/duration");
// import duration from 'dayjs/plugin/duration' // ES 2015

//dayjs.extend(duration);



dayjs.extend(utc);
dayjs.extend(timezone);
export const formatAmountInput = (amount: number | string ) => {
    if (typeof(amount) === 'number' ) {
        return amount.toLocaleString('ru-RU');
    } else if (!isNaN(Number(amount)) && amount) {
        return Number(amount).toLocaleString('ru-RU')
    } else {
        console.log('ошибка: нечисловой тип')
        return ''
    }
}
export const formatAmount = (amount: number | string, currency = false  ) => {
    if(!currency) {
        if (typeof(amount) === 'number' ) {
            return amount.toLocaleString('ru-RU');
        } else if (!isNaN(Number(amount)) && amount) {
            const retAmount = Number(amount).toLocaleString('ru-RU')
            if(retAmount.split(',').length === 1) return retAmount
            else if(retAmount.split(',')[1].length !== 1) return retAmount;
            else return Number(amount).toLocaleString('ru-RU',  { minimumFractionDigits: 2 });
        } else {
            console.log('ошибка: нечисловой тип')
            return ''
        }
    } else {
        if (typeof(amount) === 'number' ) {
            return amount.toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0});
        } else if (!isNaN(Number(amount)) && amount) {
            return Number(amount).toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0});
        } else {
            console.log('ошибка: нечисловой тип')
            return ''
        }
    }

}

export const formatFromAmount = (str: string) => {
    const firstNumber = str.replace(/[^0-9,.]/g, "")
    return firstNumber.replace(/,/g, ".")
}

export const formatDate = (date: string | number | Dayjs, format = 'DD MMMM') => {
    return dayjs(date).locale('ru').format(format)
}
export const localDate = (date: string | number | null = null) => {
    const timeZone = dayjs.tz.guess()
    return date !== null ?
        dayjs(date).tz(timeZone).local().format():
        dayjs().tz(timeZone).local().format()

}
export const getYearsOld = (dateBirth: string | number | null = null) => {
    const timeZone = dayjs.tz.guess()

    const currentDate = dayjs().tz(timeZone).local()
    const dateBirthDayjs = dayjs(dateBirth).tz(timeZone).local()

    const countYears = currentDate.diff(dateBirthDayjs, 'year')

    const addedYears = dateBirthDayjs.add(countYears, 'year');
    console.log('subtractYears', addedYears.toString())

    const countMonths = currentDate.diff(addedYears, 'month')
    const addedMonths = addedYears.add(countMonths, 'month');

    //const countWeek = currentDate.diff(dateBirth, 'week')
    const countDays = currentDate.diff(addedMonths, 'day')
    console.log('test, ', {...dayjs.duration(currentDate.diff(dateBirth), 'day')}, dayjs.duration(currentDate.diff(dateBirth), 'year').humanize() , dayjs.duration(currentDate.diff(dateBirth), 'month').humanize(), countYears  )
    console.log('countMonths, ', dayjs.duration(currentDate.diff(dateBirth), 'year').humanize() , dayjs.duration(currentDate.diff(dateBirth), 'month').humanize(), countYears  )
    return (countYears > 1? (dayjs.duration(countYears, 'year').humanize() + " "): "" ) +
        (countYears == 1 ? "1 год " : "" ) +
        (countMonths > 1? (dayjs.duration(countMonths, 'month').humanize() + " "): "") +
        (countMonths == 1? '1 месяц ': "") +
        (countDays > 1 && countDays !== 30? dayjs.duration(countDays, 'day').humanize(): "") +
        (countDays == 1 ? "1 день ": "") +
        (countDays == 30 ? "30 дней ": "")
}

/**
 * Вычисляет возраст в годах, месяцах и днях на основе даты рождения.
 *
 * @param {string|Date} birthDate - Дата рождения в формате, который понимает dayjs (например, 'YYYY-MM-DD').
 * @param {string|Date} currentDate - (Необязательно) Дата, на которую вычисляется возраст. Если не указана, используется текущая дата.
 * @returns {object} Объект с полями `years`, `months`, `days` и `exact` (строка с точным описанием возраста). Возвращает null, если дата рождения невалидна.
 */
export const calculateAge = (birthDate: string | number | null = null) => {
    const currentDate = dayjs()
    const timeZone = dayjs.tz.guess()

    const birth = dayjs(birthDate).tz(timeZone).local();
    const now = dayjs(currentDate).tz(timeZone).local();

    if (!birth.isValid()) {
        console.error('Неверный формат даты рождения.');
        return null;
    }

    let years = now.year() - birth.year();
    let months = now.month() - birth.month();
    let days = now.date() - birth.date();

    if (days < 0) {
        months--;
        const lastMonth = now.clone().month(now.month() - 1);
        days = now.date() + lastMonth.daysInMonth() - birth.date();
    }

    if (months < 0) {
        years--;
        months = months + 12;
    }
    if(years < 0){
        return {
            years: 0,
            months: 0,
            days: 0,
            exact: "Ошибка в дате рождения."
        }
    }

    let exact = '';

    if (years > 0) {
        exact += `${years} ${getPluralForm(years, 'год', 'года', 'лет')} `;
    }

    if (months > 0) {
        exact += `${months} ${getPluralForm(months, 'месяц', 'месяца', 'месяцев')} `;
    }

    if (days > 0) {
        exact += `${days} ${getPluralForm(days, 'день', 'дня', 'дней')}`;
    }
    if (exact === '') {
        exact = 'Меньше дня';
    }
    return exact
}


/**
 * Функция для правильного склонения слов в зависимости от числа (pluralization).
 *
 * @param {number} number - Число.
 * @param {string} one - Форма для 1 (например, "год").
 * @param {string} few - Форма для 2, 3, 4 (например, "года").
 * @param {string} many - Форма для 5, 6, 7, ... (например, "лет").
 * @returns {string} - Правильная форма слова.
 */
const getPluralForm = (number: number, one: string, few: string, many: string) => {
    const mod10 = number % 10;
    const mod100 = number % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return one;
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return few;
    } else {
        return many;
    }
}
