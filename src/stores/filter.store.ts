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
        quantitativeList
    }
})
