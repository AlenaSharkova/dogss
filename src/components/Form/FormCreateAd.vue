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

const route = useRoute();

const props = defineProps({
  itemDraftAd: {
    type: Object as PropType<AdItemStruct | null>,
    default: null
  }
})

useHead({
  title: `Dogs - создать объявление`,
});

const defaultSelect = ref({})
const breedsStore = useBreedsStore()
const adStore = useAdStore()
const authStore = useAuthStore()
const filterStore = useFilterStore()
const regionsStore = useRegionsStore()
const router = useRouter();

const form = reactive({
  name: '',
  description: '',
  price: '',
  date_birth: '',

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
const typeAdList = computed(() => filterStore.typeAdList)
const genderList = computed(() => filterStore.genderList)
const quantitativeList = computed(() => filterStore.quantitativeList)
const regionsList = computed(() => regionsStore.regionsList)
const cityList = computed(() => regionsStore.cityList || [])
const ageList = computed(() => filterStore.ageList)

const selectBreed = ref<ISelectComponent>({})
const selectAdType = ref<ISelectTypeAd>( {})
const selectRegionsExport = ref<ISelectNumber[]>( [])
const selectAge = ref<ISelectComponent>({})
const imageList = ref<ICommonUpload[]>([])

const selectRegion = ref<ISelectNumber>({})
const selectCity = ref<ISelectNumber>({})
const selectGender = ref<ISelectGender>( genderList.value[0] )
const selectQuantitative = ref<IFilterQuantitative>( quantitativeList.value[0])
const isExport = ref(false)


const isErrorSelectedRegion = ref(false)
const showErrorSelectedRegion = () => {
  isErrorSelectedRegion.value = true
}

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

const setDraftData = () => {
  console.log('date_birth', props.itemDraftAd)
  if(!props.itemDraftAd) return
  const {breed, type_ad, exportRegions, photos, geo_main, date_birth,
    name, gender, quantitative, description, price}
  = props.itemDraftAd
  if(breed) selectBreed.value = breed
  if(type_ad) selectAdType.value.value = type_ad
  if(exportRegions.isExport) isExport.value = exportRegions.isExport
  if(exportRegions.regionsList && isExport.value) selectRegionsExport.value = exportRegions.regionsList
  //if(props.itemDraftAd?.breed) selectAge.value = props.itemDraftAd?.age
  if(photos) imageList.value = photos.map(url => {
    return {
      imageUrl: url,
      status: 'success'
    }
  })
  if(geo_main.region) selectRegion.value = geo_main.region
  if(geo_main.city) selectCity.value = geo_main.city
  if(gender) selectGender.value.value = gender
  if(quantitative) selectQuantitative.value.value = quantitative
  if(name) form.name = name
  if(description) form.description = description
  if(price) form.price = String(price)
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
const getBody = (type = 'active' as 'active' | 'draft'): AdCreateItemStruct | false => {
  console.log('dayjs(form.name)', dayjs(form.name))
  console.log('dayjs(form.date_birth, \'DD.MM.YYYY\')', dayjs(form.date_birth, 'DD.MM.YYYY').format())
  const imageUploadList = imageList.value.filter(item => item.status == 'success' && item.imageUrl).map(item => item.imageUrl) as string[]

  if(
      (!dayjs(form.date_birth).isValid()
      || !selectRegion.value.value
      || !selectCity.value.value
      || !selectAdType.value.value
      || !selectQuantitative.value.value
      || !imageUploadList.length
      || !userFullData.value)
      && type === 'active'
  ) return false


  return {
    status: type,
    photos: imageUploadList,
    name: form.name,
    owner: userFullData.value.id,
    price: Number(form.price.replace(/[^0-9]/g, "")),
    count_image: 4,

    date_birth: dayjs(form.date_birth).isValid()?
        dayjs(form.date_birth, 'DD.MM.YYYY').format('YYYY-MM-DD'): null,
    breed_id: selectBreed.value.value as number,
    type_ad: selectAdType.value.value,
    description: form.description,
    is_export: isExport.value,
    parents_mum: null,
    parents_dad: null,
    region_main: selectRegion.value.value,
    city_main: selectCity.value.value,
    gender: selectQuantitative.value.value == 'one'? selectGender.value.value || null: null,
    quantitative: selectQuantitative.value.value,
    regionsExport: isExport.value && selectRegionsExport.value? selectRegionsExport.value.map(item => item.value) : null,
  }
}
const createAdForm = async (type = 'active' as 'active' | 'draft') => {

  const body = getBody(type);
  if(!body) return
  await adStore.createAd(body)
}

if(authStore.statusUser === 'active') {
  fillPersonalData()
  setDraftData()
}

onBeforeUnmount(() => {
  if(!props.itemDraftAd?.id) {
    createAdForm('draft')
  }
})

</script>

<template>
  <div class="form-create-ad" v-if="isActiveUser" >
    <FormWindow type="original" >
      <template #title>
        Подать объявление
      </template>
      <template #subtitle>
        форма
      </template>
      <template #default>

        <BaseInput
            v-model="form.name"
            title="Заголовок объявления"
            :max-length="64"
        />
        <BaseSelect
            :items="typeAdList"
            v-model="selectAdType"
            name="ad-type"
            full-value
            placeholder="Выберите тип объявления"
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
        <BaseInput v-model="form.date_birth" title="Дата рождения (DD.MM.YYYY)" mask="__.__.____" />

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

        <BaseInput
            v-model="form.price"
            title="Цена"
            total-number
            postfix=" ₽"
            :max-length="10"
            styleAmount />
        <div class="form-create-ad__list-row">
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
        <div class="form-create-ad__list-row">
          <BaseTabSwitch :items="quantitativeList" v-model="selectQuantitative" />
          <BaseTabSwitch v-if="selectQuantitative.value == 'one'" :items="genderList" v-model="selectGender" />
        </div>
        <BaseTextarea v-model="form.description" title="Описание объявления" />
        <CommonUploadImage :isShow="true" v-model="imageList"/>

      </template>
      <template #action-buttons>
        <BaseButton text="Применить" @click="createAdForm" />
      </template>


    </FormWindow>

  </div>
</template>

<style scoped lang="scss">
.form-create-ad {
  &__list {
    &-row {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 12px;
    }
  }
}
</style>