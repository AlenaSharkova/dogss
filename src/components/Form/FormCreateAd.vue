<script setup lang="ts">


import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import {useAdStore} from "~/stores/ad.store";
import {computed, ref} from "vue";
import CartAdItem from "~/components/Cart/CartAdItem.vue";
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
import BaseMiniBlock from "~/components/Base/BaseMiniBlock.vue";
import type {ISelectComponent, ISelectComponentWithChildren, ISelectNumber} from "~/struct/Common/ISelectComponent";
import {ruleRegions} from "~/utils/commonRules";
import dayjs from "dayjs";
import type {
  AdCreateItemStruct, IFilterQuantitative,
  ISelectGender,
  ISelectTypeAd
} from "~/struct/Ad/AdItemStruct";

const route = useRoute();

useHead({
  title: `Dogs - создать объявление`,
});

const defaultSelect = ref({})
const breedsStore = useBreedsStore()
const filterStore = useFilterStore()
const regionsStore = useRegionsStore()
const router = useRouter();

const selectBreed = ref<ISelectComponent>({})
const selectAdType = ref<ISelectTypeAd>( {})
const selectRegion = ref<ISelectNumber>( {})
const selectRegionsExport = ref<ISelectNumber[]>( [])
const selectCity = ref<ISelectNumber>({})
const selectAge = ref<ISelectComponent>({})

const adStore = useAdStore()
adStore.updateAdList()

const form = reactive({
  name: '',
  description: '',
  price: '',
  date_birth: '',

})

breedsStore.updateBreedsList()
const updateList = () => {
  adStore.updateAdList()
}


if(!breedsStore.breedsList) {
  breedsStore.updateBreedsList()
}
if(!regionsStore.regionsList) {
  regionsStore.updateRegionsList()
}
const breedsList = computed(() =>  breedsStore.breedsList)
const typeAdList = computed(() => filterStore.typeAdList)
const genderList = computed(() => filterStore.genderList)
const quantitativeList = computed(() => filterStore.quantitativeList)
const genderListFull = computed(() => filterStore.genderListFull)
const regionsList = computed(() => regionsStore.regionsList)
const cityList = computed(() => regionsStore.cityList || [])
const ageList = computed(() => filterStore.ageList)

const selectGender = ref<ISelectGender>(genderListFull.value[0] )
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
const getBody = (): AdCreateItemStruct | false => {
  console.log('dayjs(form.name)', dayjs(form.name))
  console.log('dayjs(form.date_birth, \'DD.MM.YYYY\')', dayjs(form.date_birth, 'DD.MM.YYYY').format())
  if(
      !dayjs(form.date_birth, 'DD.MM.YYYY')
      || !selectRegion.value.value
      || !selectCity.value.value
      || !selectAdType.value.value
      || !selectQuantitative.value.value
  ) return false

  return {
    img: '/server/image/ad12/sale/2/',
    name: form.name,
    owner: 1,
    price: Number(form.price.replace(/[^0-9]/g, "")),
    count_image: 4,

    date_birth: dayjs(form.date_birth, 'DD.MM.YYYY').format('YYYY-MM-DD'),
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
const createAdForm = async () => {
  const body = getBody();
  if(!body) return
  await adStore.createAd(body)
}
</script>

<template>
  <div class="form-create-ad">
    <FormWindow>
      <template #title>
        Подать объявление
      </template>
      <template #subtitle>
        форма
      </template>
      <template #default>
        <BaseInput v-model="form.name" title="Заголовок объявления" />
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

        <BaseInput v-model="form.price" title="Цена" total-number postfix=" ₽" :max-length="10" styleAmount />
        <span>Возможно ли обговорить доставку в другие регионы?</span>
        <BaseSwitch v-model="isExport" />
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

      </template>
      <template #action-buttons>
        <BaseButton text="Применить" @click="createAdForm" />
        <img src="@/assets/image/svg/dog-boy.png" alt="">
        <img src="@/assets/image/svg/Check.svg" alt="">



      </template>


    </FormWindow>
  </div>
</template>

<style scoped lang="scss">
.form-create-ad {
  padding-bottom: 500px;
  &__list {
    &-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }
  }
}
</style>