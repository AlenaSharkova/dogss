<script setup lang="ts">

import CardDogsItem from "~/components/Card/CardDogsItem.vue";
import {computed, type PropType, ref} from "vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import type {BreederSiteItemStruct} from "~/struct/Breeder/BreederSiteStruct";
import type {
  DogChangeItemStruct,
  DogFormCreateItemStruct,
  DogShortItemStruct,
  DogItemStruct
} from "~/struct/Dog/DogItemStruct";
import {useBreedsStore} from "~/stores/breeds.store";
import type {ISelectComponent, ISelectNumber} from "~/struct/Common/ISelectComponent";
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";
import type {AdChangeItemStruct, AdCreateItemStruct, ISelectGender} from "~/struct/Ad/AdItemStruct";
import dayjs from "dayjs";
import type {IStatusAd} from "~/struct/Common/IValueType";
import BaseInput from "~/components/Base/BaseInput.vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  typeAction: {
    type: String as PropType< 'create' | 'change'>,
    default: 'create'
  },
  defaultData: {
    type: Object as PropType<DogFormCreateItemStruct | DogItemStruct | null>,
    default: null
  }
})
const emits = defineEmits(['create', 'change', 'close'])

const breedsStore = useBreedsStore()
const filterStore = useFilterStore()

const form = reactive({
  name: '',
  date_birth: '',
})
const selectBreed = ref<ISelectNumber>({})
const approximateAgeList = computed(() =>  filterStore.approximateAgeList)
const genderList = computed(() => filterStore.genderSmallList)
const isUnknownDateOfBirth = ref(false)


const breedsList = computed(() =>  breedsStore.breedsList)
const selectApproximateAge = ref<ISelectComponent>({})
const imageList = ref<ICommonUpload[]>([])
const selectGender = ref<ISelectGender>( {} )
const currentStep = ref(1)
const formDefault = ref<DogItemStruct>({})

const isValid = computed(() =>{
  const imageUploadList = imageList.value.filter(item => item.status == 'success' && item.url)

  return (
      imageUploadList.length
      && selectGender.value?.value
      && isUnknownDateOfBirth.value
          ? selectApproximateAge.value?.value
          : dayjs(form.date_birth).isValid()
      && selectBreed.value
      && form.name
  )
})
const getBody = (): DogFormCreateItemStruct | false => {
  console.log('dayjs(form.name)', dayjs(form.name))
  console.log('dayjs(form.date_birth, \'DD.MM.YYYY\')', dayjs(form.date_birth, 'DD.MM.YYYY').format())
  const imageUploadList = imageList.value.filter(item => item.status == 'success' && item.url)

/*  if(
      (/*!dayjs(form.date_birth).isValid()
      ||
          !imageUploadList.length
          || !selectGender.value?.value
          || !selectBreed.value
      )
  ) return false*/
  if(!isValid.value && !props.defaultData) return false

  return {
    breed: selectBreed.value,
    name: form.name,
    photos: imageUploadList,
    approximate_age: isUnknownDateOfBirth.value
        ? selectApproximateAge.value?.value: null,
    date_birth: dayjs(form.date_birth).isValid() && !isUnknownDateOfBirth.value?
        dayjs(form.date_birth, 'DD.MM.YYYY').format('YYYY-MM-DD'): null,
    gender: selectGender.value.value,
  }
}

const likeChange = (form: DogFormCreateItemStruct) => {
  const fieldChange = {} as DogChangeItemStruct
  if(!props.defaultData) return
  for(let id in form) {
    let item = form[id as keyof DogFormCreateItemStruct]
    let itemDefault = formDefault.value[id as keyof DogItemStruct]
    console.log(' changeDataDog 123456', id, item, JSON.stringify(itemDefault))

    if(JSON.stringify(item) !== JSON.stringify(itemDefault) && itemDefault !== undefined) {
      fieldChange[id as keyof DogChangeItemStruct] = item
    }
  }
  return fieldChange
}
const sendDogForm = async () => {
  if(props.defaultData) {
    changeDataDog()
    //await changeDataDog('moderation', 'moderation')
    return
  }
  const body = getBody();
  if(!body) return
  emits('create', body)

}

const setDefaultData = () => {
  console.log(2, JSON.stringify(genderList.value))

  console.log('defaultData', props.defaultData)
  if(!props.defaultData) return
  const {breed, photos, date_birth,
    name, approximate_age}
      = props.defaultData
  if(breed) selectBreed.value = breed
  console.log(3, JSON.stringify(genderList.value))
  if(approximate_age) {
    isUnknownDateOfBirth.value = true
    selectApproximateAge.value.value = approximate_age
  }
  if(photos) imageList.value = photos.map(url => {
    return {
      url: url,
      status: 'success'
    }
  })
  if(name) form.name = name
  if(date_birth) form.date_birth = date_birth

  formDefault.value = getBody()
}
const changeDataDog = async () => {
  const body = getBody();
  console.log('changeDataDog body', body)

  const changeData = body? likeChange(body): {}
  console.log('changeDataDog', changeData)

  if(changeData && Object.keys(changeData).length && props.defaultData) {
    emits('change', changeData, (props.defaultData as DogItemStruct).id)
  } else {
    console.error('отсутствует номер объявления или данные изменения пустые')
  }
}

onMounted(() => {
  setDefaultData()
})
</script>

<template>
  <div class="breeder-site__pets-manage__modal">
    <Teleport to="body">
      <BaseModal :is-show-modal="isShow" @close="emits('close')">
        <FormWindow modal class="breeder-site__pets-manage__modal-form">
          <template #title>
            {{defaultData? 'Редактировать Питомца' : 'Добавить Питомца'}}
          </template>
          <template #default>
            {{defaultData}}
            <template v-if="true">
              <BaseInput
                  v-model="form.name"
                  title="Имя питомца"
                  :max-length="64"
              />
              <BaseSelect
                  v-if="breedsList?.length"
                  :items="breedsList"
                  v-model="selectBreed"
                  show-search
                  full-value
                  name="breed"
                  placeholder="Выберите породу"
              />

              <div class="breeder-site__pets-manage__modal-form__row">
                <div class="breeder-site__pets-manage__modal-form__together">
                  <BaseSwitch v-model="isUnknownDateOfBirth" />
                  <p class="breeder-site__pets-manage__modal-form__date-text">Дата рождения неизвестна</p>
                </div>
                <BaseInput
                    v-if="!isUnknownDateOfBirth"
                    v-model="form.date_birth"
                    title="Дата рождения (DD.MM.YYYY)"
                    mask="**.**.****"
                    replaceForData
                    total-number-mask
                    :rules="[ruleValidDate]"
                />
                <BaseSelect
                    v-else-if="approximateAgeList?.length"
                    :items="approximateAgeList"
                    v-model="selectApproximateAge"
                    full-value
                    name="approximate-age"
                    placeholder="Выберите примерный возраст"
                />
              </div>
              <BaseTabSwitch :items="genderList" v-model="selectGender" name="gender" is-small/>
              <CommonUploadImage :isShow="true" v-model="imageList" :limit="10"/>

            </template>
          </template>
          <template #action-buttons>
            <BaseButton text="Сохранить" @click="sendDogForm" :disabled="!isValid"/>
          </template>
        </FormWindow>
      </BaseModal>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.breeder-site__pets-manage__modal {
  &-form {
    width: 900px;
    height: 600px;
    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      @media (max-width: 1180px) {
        align-items: flex-start;
        flex-direction: column;
      }
    }
    &__together {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      &__text {
        text-wrap: nowrap;
      }
    }
  }
}

</style>