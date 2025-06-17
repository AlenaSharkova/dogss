import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type {AdItemStruct, IFilterAge, IFilterQuantitative, ISelectGender} from "~/struct/Ad/AdItemStruct";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";


export const useFilterStore = defineStore('filterStore', () => {
    const config = useRuntimeConfig();


    let typeAdList = ref<ISelectComponent[]>([
        {
            text: 'Купить / На продажу',
            value: 'purchase'
        },
        {
            text: 'В добрые руки',
            value: 'good-hands'
        },
        {
            text: 'Вязка',
            value: 'mating'
        },
        {
            text: 'Потерявшиеся',
            value: 'lost'
        }
    ])
    let approximateAgeList = ref<ISelectComponent[]>([
        {
            text: 'До 6 месяцев',
            value: 'up-to-6-months'
        },
        {
            text: 'от 6 до 12 месяцев',
            value: '6-12-months'
        },
        {
            text: '1 год',
            value: '1'
        },
        {
            text: '2 года',
            value: '2'
        },
        {
            text: '3 года',
            value: '3'
        },
        {
            text: '4 года',
            value: '4'
        },
        {
            text: '5 лет',
            value: '5'
        },
        {
            text: '6 лет',
            value: '6'
        },
        {
            text: '7 лет',
            value: '7'
        },
        {
            text: '8 лет',
            value: '8'
        },
        {
            text: '9 лет',
            value: '9'
        },
        {
            text: '10 лет',
            value: '10'
        },
        {
            text: '11 лет',
            value: '11'
        },
        {
            text: '12 лет',
            value: '12'
        },
        {
            text: '13 лет',
            value: '13'
        },
        {
            text: '14 лет',
            value: '14'
        },
        {
            text: '15 лет',
            value: '15'
        },
        {
            text: '16 лет',
            value: '16'
        },
        {
            text: '17 лет',
            value: '17'
        },
        {
            text: '18 лет',
            value: '18'
        },
        {
            text: '19 лет',
            value: '19'
        },
        {
            text: '20 лет',
            value: '20'
        },
    ])
    const genderList = ref<ISelectGender[]>( [
        {
            text: 'Девочка',
            value: 'female'
        },
        {
            text: 'Мальчик',
            value: 'male'
        },
    ])
    const quantitativeList = ref<IFilterQuantitative[]>( [

        {
            text: 'Одна собака',
            value: 'one'
        },
        {
            text: 'Несколько собак / Помёт',
            value: 'litter'
        }

    ])
    const ageList = ref<IFilterAge[]>( [
        {
            text: 'Щенок (до 6 месяцев)',
            value: 'puppy',
            details: {
                minAgeMonth: 0,
                maxAgeMonth: 6
            }
        },
        {
            text: 'Молодая (от 6 месяцев до 1,5 лет)',
            value: 'young',
            details: {
                minAgeMonth: 6,
                maxAgeMonth: 18
            }
        },
        {
            text: 'Взрослая (от 1,5 до 7 лет)',
            value: 'adult',
            details: {
                minAgeMonth: 18,
                maxAgeMonth: 82
            }
        },
        {
            text: 'Пожилая (от 7 лет)',
            value: 'elderly',
            details: {
                minAgeMonth: 80,
                maxAgeMonth: 'infinite'
            }
        },
    ])


    return {
        typeAdList,
        genderList,
        ageList,
        quantitativeList,
        approximateAgeList
    }
})
