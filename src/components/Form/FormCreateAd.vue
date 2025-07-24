<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
import type {ISelectComponent, ISelectNumber} from "~/struct/Common/ISelectComponent";
import {ruleRegions} from "~/utils/commonRules";
import dayjs from "dayjs";
import type {
  AdCreateItemStruct, AdItemStruct, IFilterQuantitative,
  ISelectGender,
  ISelectTypeAd
} from "~/struct/Ad/AdItemStruct";
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";
import FormWindow from "./FormWindow.vue";
import BaseInput from "../Base/BaseInput.vue";
import {useBreedsStore} from "~/stores/breeds.store";
import type {UserChangeItemStruct, UserFormItemStruct} from "~/struct/User/UserItemStruct";
import type {ICommonFormValid} from "~/struct/Common/ICommonForm";
import type {IStatusAd} from "~/struct/Common/IValueType";


const route = useRoute();

const props = defineProps({
  itemChangeDateAd: {
    type: Object as PropType<AdItemStruct | null>,
    default: null
  },
  isDraftAd: {
    type: Boolean,
    default: false
  }
})

useHead({
  title: `Dogs - создать объявление`,
});

const defaultSelect = ref({})
const breedsStore = useBreedsStore()
const adStore = useAdStore()
const personalAdStore = usePersonalAdStore()
const authStore = useAuthStore()
const filterStore = useFilterStore()
const regionsStore = useRegionsStore()
const router = useRouter();

const form = reactive({
  name: '',
  description: '',
  price: '',
  date_birth: '',
  number_dogs: {
    male: '',
    female: ''
  }
})

const userFullData = computed(() => authStore.userFullData)
const isActiveUser = computed(() => authStore.statusUser === 'active')

if(!breedsStore.breedsList) {
  //breedsStore.updateBreedsList()
}
if(!regionsStore.regionsList) {
  regionsStore.updateRegionsList()
}

const breedsList = computed(() =>  breedsStore.breedsList)
const approximateAgeList = computed(() =>  filterStore.approximateAgeList)
const typeAdList = computed(() => filterStore.typeAdList)
const genderList = computed(() => filterStore.genderList)
const quantitativeList = computed(() => filterStore.quantitativeList)
const regionsList = computed(() => regionsStore.regionsList)
const cityList = computed(() => regionsStore.cityList || [])
const ageList = computed(() => filterStore.ageList)

const selectBreed = ref<ISelectComponent>({})
const selectApproximateAge = ref<ISelectComponent>({})
const selectAdType = ref<ISelectTypeAd>( {})
const selectRegionsExport = ref<ISelectNumber[]>( [])
const selectAge = ref<ISelectComponent>({})
const imageList = ref<ICommonUpload[]>([])

const selectRegion = ref<ISelectNumber>({})
const selectCity = ref<ISelectNumber>({})
const selectGender = ref<ISelectGender>( {} )
const isExport = ref(false)
const isUnknownDateOfBirth = ref(false)
const isAgreedPrice  = ref(false)
const isFreePrice  = ref(false)
const isSaveDraft  = ref(false)
const currentStep = ref(1)

const isErrorSelectedRegion = ref(false)
console.log(1, JSON.stringify(genderList.value))
const titleStep = computed(() => {
  if(currentStep.value === 1) return 'Выберите тип объявления'
  if(currentStep.value === 2) return 'Заполните данные собаки'
  if(currentStep.value === 3) return 'Гео данные'
  if(currentStep.value === 4) return 'Уточните данные объявления'
})
const disabledButton = computed(() => {
  if(currentStep.value === 1) return !selectAdType.value.value
  if(currentStep.value === 2) return !(selectBreed.value.value && (isUnknownDateOfBirth.value? selectApproximateAge.value.value: form?.date_birth) && ( form.number_dogs.female || form.number_dogs.male || selectGender.value.value !== 'litter') && imageList.value.length)
  if(currentStep.value === 3) return !(selectRegion.value.value && selectCity.value?.value && (selectRegionsExport.value[0]?.value || !isExport.value))
  if(currentStep.value === 4) return !(form.name && (form.price !== '' || isAgreedPrice.value) )
})
const nextStep = async () => {
  if(currentStep.value == 1) currentStep.value++
  else if(currentStep.value === 2) currentStep.value++
  else if(currentStep.value === 3) {
    form.name = getNameAd()
    currentStep.value++
  }
  else if(currentStep.value === 4) await createAdForm()
}
const getNameAd = () => {
  switch (selectAdType.value.value) {
    case 'purchase': return 'Продаётся собака'
    case 'good-hands': return 'Собака в добрые руки'
    case 'mating': return 'Предлагается вязка'
    case 'lost': return 'Потерялась собака'
    default: return ''
  }
}
const prevStep = () => {
  currentStep.value--
}

const widthProgress = computed(() => (currentStep.value * 25) + '%')
const countDogs = computed(() => (props.itemChangeDateAd?.number_male || 0) + (props.itemChangeDateAd?.number_female || 0));
const malePercentage = computed(() => ((props.itemChangeDateAd?.number_male || 0) / countDogs?.value) * 100)

watch(() => selectRegion.value,
    (newRegion) => {
      selectCity.value = {}
      if(newRegion?.value) regionsStore.getCityList(newRegion.value)
    }
)
watch(() => authStore.statusUser,
    async (newStatusUser) => {
      if(newStatusUser === 'active') {
        await fillPersonalData()
      }
    }
)
watch(() => isFreePrice.value, (newIsFreePrice) => {
    if(newIsFreePrice) {
      form.price = '0'
      isAgreedPrice.value = false
    }
})
watch(() => isAgreedPrice.value, (newIsAgreedPrice) => {
    if(newIsAgreedPrice) {
      form.price = ''
      isFreePrice.value = false
    }
})
watch(() => selectAdType.value.value, (newType) => {
    if(newType === 'good-hands') {
      form.price = '0'
      isFreePrice.value = true
    }
})
const showErrorSelectedRegion = () => {
  isErrorSelectedRegion.value = true
}

const setDefaultData = () => {
  console.log(2, JSON.stringify(genderList.value))

  console.log('itemChangeDateAd', props.itemChangeDateAd)
  if(!props.itemChangeDateAd) return
  const {breed, type_ad, exportRegions, photos, geo_main, date_birth,
    name, number_female, number_male, is_contractual_price, description, price, approximate_age}
  = props.itemChangeDateAd
  if(breed) selectBreed.value = breed
  if(type_ad) selectAdType.value.value = type_ad
  if(exportRegions.isExport) isExport.value = exportRegions.isExport
  if(exportRegions.regionsList && isExport.value) selectRegionsExport.value = exportRegions.regionsList
  if(countDogs.value <= 1) selectGender.value.value = number_female? 'female': 'male'
  else {
    selectGender.value.value = 'litter'
    console.log(' selectGender.value',  selectGender.value, countDogs.value)
    if(number_female) form.number_dogs.female = String(number_female)
    else if(number_male) form.number_dogs.male = String(number_male)
  }
  console.log(3, JSON.stringify(genderList.value))

  if(is_contractual_price) isAgreedPrice.value = is_contractual_price
  if(approximate_age) {
    isUnknownDateOfBirth.value = true
    selectApproximateAge.value.value = approximate_age
  }
  if(photos) imageList.value = photos.map(url => {
    return {
      imageUrl: url,
      status: 'success'
    }
  })
  if(geo_main.region) selectRegion.value = geo_main.region
  if(geo_main.city) selectCity.value = geo_main.city
  if(name) form.name = name

  if(description) form.description = description
  if(price !== null) form.price = String(price)
  if(price === 0) isFreePrice.value = true
  if(date_birth) form.date_birth = date_birth
}

const fillPersonalData = async () => {
  if(!userFullData.value) return
  console.log('userFullData.value.personal_data.geo_main', userFullData.value.personal_data.geo_main)
  selectRegion.value = userFullData.value.personal_data.geo_main.region
  if(!selectRegion.value?.value) return
  await regionsStore.getCityList(selectRegion.value?.value)
  selectCity.value = userFullData.value.personal_data.geo_main.city
}
const getBody = (typeSaved = 'active' as 'active' | 'draft'): AdCreateItemStruct | false => {
  console.log('dayjs(form.name)', dayjs(form.name))
  console.log('dayjs(form.date_birth, \'DD.MM.YYYY\')', dayjs(form.date_birth, 'DD.MM.YYYY').format())
  const imageUploadList = imageList.value.filter(item => item.status == 'success' && item.imageUrl).map(item => item.imageUrl) as string[]

  if(
      (/*!dayjs(form.date_birth).isValid()
      || */!selectRegion.value.value
      || !selectCity.value.value
      || !selectAdType.value.value
      || !imageUploadList.length
      || !userFullData.value
      || !selectRegion.value.value


      )
      && typeSaved === 'active'
  ) return false


  return {
    status: typeSaved,
    photos: imageUploadList,
    name: form.name,
    owner: userFullData.value.id,
    price: form.price !== ''? Number(form.price.replace(/[^0-9]/g, "")): null,
    count_image: 4,

    date_birth: dayjs(form.date_birth).isValid() && !isUnknownDateOfBirth.value?
        dayjs(form.date_birth, 'DD.MM.YYYY').format('YYYY-MM-DD'): null,
    breed_id: selectBreed.value.value as number,
    type_ad: selectAdType.value.value,
    description: form.description,
    is_export: isExport.value,
    parents_mum: null,
    parents_dad: null,
    region_main: selectRegion.value.value,
    city_main: selectCity.value.value,
    //gender: selectQuantitative.value?.value == 'one'? selectGender.value.value || null: null,
    //quantitative: selectQuantitative.value?.value,
    number_male: selectGender.value.value === 'litter'
        ? Number(form.number_dogs.male)
        : (selectGender.value.value === 'male'? 1: 0),
    number_female: selectGender.value.value === 'litter'
        ? Number(form.number_dogs.female)
        : (selectGender.value.value === 'female'? 1: 0),
    approximate_age: isUnknownDateOfBirth.value
        ? selectApproximateAge.value.value: null,
    is_contractual_price: isAgreedPrice.value,
    regionsExport: isExport.value && selectRegionsExport.value? selectRegionsExport.value.map(item => item.value) : null,
  }
}

const likeChange = (form: AdCreateItemStruct) => {
  const fieldChange = {}
  console.log('form def', form, props.itemChangeDateAd)
  for(let id in form) {
    let item = form[id as keyof AdCreateItemStruct]
    let itemDefault = props.itemChangeDateAd[id as keyof AdCreateItemStruct]
    if(JSON.stringify(item) !== JSON.stringify(itemDefault) && itemDefault !== undefined) {
      fieldChange[id] = item
    }
  }
  return fieldChange
}
const createAdForm = async (typeSaved = 'active' as 'active' | 'draft') => {
  if(props.itemChangeDateAd?.id && props.itemChangeDateAd.status == 'draft' ) {
    await changeDataAd('active', 'active')
    return
  }
  if(props.itemChangeDateAd?.id && props.itemChangeDateAd.status == 'active' ) {
    await changeDataAd('active')
    return
  }
  const body = getBody(typeSaved);
  if(!body) return

  await personalAdStore.createAd(body)
      .then(res => {
        router.push('/personal/publications')
      })

}
const changeDataAd = async (typeSaved = 'active' as 'active' | 'draft', newStatus = null as null | IStatusAd) => {

  const body = getBody(typeSaved);
  const changeData = likeChange(body)
  console.log('changeData', changeData, Object.keys(changeData).length)
  if(changeData && Object.keys(changeData).length) {
    await personalAdStore.changeAd(changeData, props.itemChangeDateAd?.id, newStatus)
        .then(res => {
      console.log('changeData res', res)
          router.push('/personal/publications?type=active')
        }).catch(err => {
          console.log('eerrr', err)
    })
  }
}

if(authStore.statusUser === 'active') {
  fillPersonalData()
  setDefaultData()
}
const toDraft = async () => {
  if(props.itemChangeDateAd?.id) {
    await changeDataAd('draft')
  } else await createAdForm('draft')
  isSaveDraft.value = true
  await router.push('/personal/publications?type=draft')
}
onBeforeUnmount(() => {
  if(!props.itemChangeDateAd?.id && selectAdType.value.value && !props.isDraftAd && !isSaveDraft.value) {
    createAdForm('draft')
  }
})
</script>

<template>
  <div class="form-create-ad" v-if="isActiveUser" >
    <FormWindow
        type="original"
        :is-prev="currentStep !== 1"
        @prev="prevStep"
        class="form-create-ad__block">

      <template #title>
        Подать объявление
      </template>
      <template #subtitle>
        <div class="form-create-ad__progress">
          <div class="form-create-ad__progress-content">
            <span class="form-create-ad__progress-content__step">
              Шаг {{ currentStep }} из 4
            </span>
            <span class="form-create-ad__progress-content__title">
              {{ titleStep }}
            </span>
          </div>
          <BaseProgressBar :width-progress="widthProgress" />
        </div>

      </template>
      <template #default>
        <template v-if="currentStep == 1">

          <BaseSelect
              :items="typeAdList"
              v-model="selectAdType"
              name="ad-type"
              full-value
              placeholder="Выберите тип объявления"
          />
        </template>
        <template v-if="currentStep == 2">

          <BaseSelect
              v-if="breedsList?.length"
              :items="breedsList"
              v-model="selectBreed"
              show-search
              full-value
              name="breed"
              placeholder="Выберите породу"
          />
          <div class="form-create-ad__list-row">

            <BaseInput
                v-if="!isUnknownDateOfBirth"
                v-model="form.date_birth"
                title="Дата рождения (DD.MM.YYYY)"
                mask="**.**.****"
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
            <div class="form-create-ad__list-together">
              <BaseSwitch v-model="isUnknownDateOfBirth" />
              <p class="form-create-ad__list-date__text">Дата рождения неизвестна</p>
            </div>
          </div>
          {{selectGender}}
          <BaseTabSwitch :items="genderList" v-model="selectGender" name="gender"/>
          <div v-if="selectGender.value === 'litter'" class="form-create-ad__list-together">
              <BaseInput total-number :max-length="2" title="Количество девочек" v-model="form.number_dogs.female" />
              <BaseInput total-number :max-length="2" title="Количество мальчиков" v-model="form.number_dogs.male"  />
            </div>
          <CommonUploadImage :isShow="true" v-model="imageList" :limit="10"/>

        </template>
        <template v-if="currentStep == 3">
          <BaseSelect
              v-if="regionsList?.length"
              :items="regionsList"
              :show-error="isErrorSelectedRegion"
              :rules="[ruleRegions]"
              v-model="selectRegion"
              show-search
              name="ad-region"
              full-value
              placeholder="Выберите регион"
          />
          <BaseSelect
              :disable="!selectRegion?.value"
              :items="cityList"
              v-model="selectCity"
              show-search
              name="ad-city"
              full-value
              placeholder="Выберите город"
              @click="showErrorSelectedRegion"
          />
          <div class="form-create-ad__list-together">
            <BaseSwitch v-model="isExport" />
            <span>Возможно ли обговорить доставку в другие регионы?</span>
          </div>
          <BaseSelect
              v-if="regionsList?.length && isExport"
              :items="regionsList"
              :rules="[ruleRegions]"
              v-model="selectRegionsExport"
              show-search
              multiple
              name="ad-region"
              full-value
              placeholder="Выберите регион для доставки"
          />
        </template>
        <template v-if="currentStep == 4">
          <BaseInput
              v-model="form.name"
              title="Заголовок объявления"
              :max-length="64"
          />
          <div class="form-create-ad__list-row">
            <BaseInput
                v-model="form.price"
                title="Цена"
                total-number
                postfix=" ₽"
                :max-length="10"
                :disabled="isAgreedPrice || isFreePrice"
                styleAmount />
            <div class="form-create-ad__list-together">
              <BaseSwitch v-model="isAgreedPrice" :readonly="selectAdType.value === 'good-hands'" />
              <span>Договорная цена</span>
            </div>
            <div class="form-create-ad__list-together">
              <BaseSwitch v-model="isFreePrice" :readonly="selectAdType.value === 'good-hands'"/>
              <span>Бесплатно</span>
            </div>
          </div>
          <BaseTextarea v-model="form.description" title="Описание объявления" />

        </template>


      </template>
      <template #action-buttons>
        <BaseButton
            :disabled="!selectAdType?.value || false"
            text="Добавить в Черновики"
            type="secondary"
            @click="toDraft"
        />
        <BaseButton
            v-if="currentStep !== 5"
            :disabled="disabledButton"
            text="Дальше"
            type="teriary"
            @click="nextStep"
        />

      </template>


    </FormWindow>
    <AdHaveDraftsModal v-if="!itemChangeDateAd" />
  </div>
</template>

<style scoped lang="scss">
.form-create-ad {
  &__block {
    width: 100%;
    @media (max-width: $sm) {
      
    }
  }
  &__progress {
    margin: 20px 0;
    &-content {
      display: grid;
      padding-bottom: 10px;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: end;
      &__step {
        text-align: start;
        @include text-normal(500);
      }
      &__title {
        @include h6;
      }
    }
  }
  &__list {
    &-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      @media (max-width: $sm) {
        align-items: flex-start;
        flex-direction: column;
      }
    }
    &-together {
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