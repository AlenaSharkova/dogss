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
            return amount.toLocaleString("ru-RU", { style: "currency", currency: "RUB"});
        } else if (!isNaN(Number(amount)) && amount) {
            return Number(amount).toLocaleString("ru-RU", { style: "currency", currency: "RUB"});
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
    console.log('test', dayjs.duration(currentDate.diff(dateBirth), 'year').humanize() , dayjs.duration(currentDate.diff(dateBirth), 'month').humanize()  )
    return (countYears > 1? (dayjs.duration(countYears, 'year').humanize() + " "): "" ) +
        (countYears == 1 ? "1 год " : "" ) +
        (countMonths > 1? (dayjs.duration(countMonths, 'month').humanize() + " "): "") +
        (countMonths == 1? '1 месяц ': "") +
        (countDays > 1 && countDays !== 30? dayjs.duration(countDays, 'day').humanize(): "") +
        (countDays == 1 ? "1 день ": "") +
        (countDays == 30 ? "30 дней ": "")
}