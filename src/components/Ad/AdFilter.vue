<script setup lang="ts">
import {computed, ref} from "vue";
import type {ISelectComponent, ISelectComponentWithChildren} from "~/struct/Common/ISelectComponent";

const breedsStore = useBreedsStore()
const adStore = useAdStore()
const filterStore = useFilterStore()
const regionsStore = useRegionsStore()
const router = useRouter();

const selectBreed = ref<ISelectComponent[]>(adStore.adCatalogFilter.breeds || [])
const selectAdType = ref<ISelectComponent>( {})
const selectRegions = ref<ISelectComponentWithChildren[]>( adStore.adCatalogFilter.regions || [])
const selectAge = ref<ISelectComponent>( {})
const selectGender = ref<ISelectComponent>( {})
const selectedMinPrice = ref(0);
const selectedMaxPrice = ref(1000);
const minFullPrice = ref(0);
const maxFullPrice = ref(2000);

watchEffect(() => {
  if(adStore.adCatalogFilter.maxFullPrice !== undefined) maxFullPrice.value = adStore.adCatalogFilter.maxFullPrice
})
watchEffect(() => {
  if(adStore.adCatalogFilter['max-price'] !== undefined) selectedMaxPrice.value = adStore.adCatalogFilter['max-price'] || maxFullPrice.value
})
watchEffect(() => {
  if(adStore.adCatalogFilter['min-price'] !== undefined) selectedMinPrice.value = adStore.adCatalogFilter['min-price']
})
watchEffect(() => {
  selectBreed.value = adStore.adCatalogFilter.breeds || []
})
watchEffect(() => {
  selectAdType.value = adStore.adCatalogFilter.type || {}
})
watchEffect(() => {
  selectGender.value = adStore.adCatalogFilter.gender || {}
})
watch(() => adStore.adCatalogFilter.regions,
    (newValue) => {
  selectRegions.value = newValue || []
})
/*watch(() => adStore.adCatalogFilter.breeds,
    (newValue) => {
      console.log('newValue breeds', newValue)
  selectBreed.value = newValue || []
})*/

/*watch(() => adStore.adCatalogFilter.type,
    (newValue) => {
  selectAdType.value = newValue || {}
})
watch(() => adStore.adCatalogFilter.gender,
    (newValue) => {
  selectGender.value = newValue || {}
})*/

if(!breedsStore.breedsList) {
 // breedsStore.updateBreedsList()
}
if(!regionsStore.regionsListFull) {
  regionsStore.updateRegionsListFull()
}
const breedsList = computed(() =>  breedsStore.breedsList)
const typeAdList = computed(() => filterStore.typeAdList)
const genderList = computed(() => filterStore.genderList)
const regionsListFull = computed(() => regionsStore.regionsListFull)
const ageList = computed(() => filterStore.ageList)

const goFilter = () => {
  const breeds = selectBreed.value.map(item => item.value).filter(item => !!item)?.join(',')
  const type = selectAdType.value.value || ''
  let gender = selectGender.value.value || ''
  let ageCategory = selectAge.value.value || ''


  let regionsArr: any[] = []
  let cityArr: any[] = []
  selectRegions.value.forEach(item => {
    if(item.children) {
      regionsArr.push(item.value)
    } else {
      cityArr.push(item.value)
    }
  })
  let regions = regionsArr.filter(item => !!item)?.join(',')
  let city = cityArr.filter(item => !!item)?.join(',')

  router.push({name: 'catalog', query: {
      ...breeds? {breeds}: undefined ,
      ...type? {type}: undefined ,
      ...regions? {regions}: undefined ,
      ...city? {city}: undefined ,
      ...gender? {gender}: undefined ,
      ...ageCategory? {ageCategory}: undefined ,
      'min-price': selectedMinPrice.value,
      'max-price': selectedMaxPrice.value,
    }})
}
const swipeFilter = () => {
  router.push({ query: {}})
}

const handlePriceRangeChanged = (range: any) => {
  selectedMinPrice.value = range.min;
  selectedMaxPrice.value = range.max;
  console.log('Выбранный диапазон:', selectedMinPrice.value, selectedMaxPrice.value);
};

const showPriceRange = ref(false)

</script>

<template>
  <div class="ad-filter">
    <!--
    <div class="ad-filter__title">
      <p>Найти</p>
    </div>
    -->
    <div class="ad-filter__list">
      <BaseSelect
          v-if="breedsList?.length"
          :items="breedsList"
          v-model="selectBreed"
          show-search
          name="breed"
          multiple
          placeholder="Выберите породу"
      />
      <BaseSelect
          :items="typeAdList"
          v-model="selectAdType"
          name="ad-type"
          full-value
          placeholder="Выберите тип объявления"
      />
      <BaseSelect
          v-if="ageList?.length"
          :items="ageList"
          v-model="selectAge"
          name="ad-age"
          full-value
          placeholder="Выберите возраст"
      />
      <BaseSelect
          v-if="genderList?.length"
          :items="genderList"
          v-model="selectGender"
          name="ad-gender"
          full-value
          placeholder="Выберите пол"
      />
      <BaseSelect
          v-if="regionsListFull?.length"
          full-value
          placeholder="Выберите регион"
          v-model="selectRegions"
          :items="regionsListFull"
          multiple
          show-search
          name="regions"
          is-enclosure
      >
        <RegionsSelect/>
      </BaseSelect>
      <BasePriceRange
          v-if="minFullPrice !== null  && maxFullPrice && selectedMinPrice !== null && selectedMaxPrice "
          :min-value="minFullPrice"
          :max-value="maxFullPrice"
          :step="10"
          :priceGap="10"
          v-model:min-price="selectedMinPrice"
          v-model:max-price="selectedMaxPrice"
      />
<br>
<br>


    </div>
    <div class="ad-filter__action">
      <!--todo: disabled-->
      <BaseButton text="Сбросить" @click="swipeFilter" type="secondary" />
      <BaseButton text="Применить" @click="goFilter" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ad-filter {
  min-width: 400px;
  height: calc(100vh - 100px);
  overflow-x: auto;
  padding: 0 0 20px 0;
  @media (max-width: $sm) {
    min-width: auto;
    overflow-x: hidden;
    padding: 0;
  }
  &__title {
    margin-bottom: 8px;
    @include h5;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__action {
    margin-top: 20px;
    display: flex;
    gap: 8px;
    @media (max-width: $xs) {
      flex-direction: column-reverse;
    }
  }
}
</style>