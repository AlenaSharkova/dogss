import {computed, reactive, ref} from "vue";

export const getColorCircle = (name: string | null) => {
    if(name) {
        let hash = 0;
        name.split('').forEach(char => {
            hash = char.charCodeAt(0) + ((hash << 5) - hash)
        })
        return '#' + ((hash & 0xFFFFFF).toString(16).padStart(6, '0'));
    }
}

export const abbreviationName = (name: string | null) => {
    if (name) {
        const words = name.split(' ');
        const firstLetters = words?.map((item) => item[0])
        return firstLetters?.join('').slice(0, 2).toUpperCase()
    } else return ''
}

export const maskParam = (paramName: string | null) => {
    if (paramName === 'card_number') return '____ ____ ____ ____'
    else if (paramName === 'phone') return ' (___) ___-__-__'
    else return ''
}

export const validCharacters = reactive<any>( {
    password: "!@#$%^&*()_+{}':;a-zA-Z0-9[\u{0022}\\\u{005D}",
    nikname: "a-zA-Z0-9._-",

})

export const formatCard = (paramValue: string) => {
 return paramValue.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, '$1 $2 $3 $4')
}

export const forSendingParam = (paramName: string | null, paramValue: string) => {
    if (paramName === 'card_number') return paramValue.replaceAll(' ', '')
    else if (paramName === 'phone') return paramValue.replaceAll(/[ -]/g, '')
    else return ''
}