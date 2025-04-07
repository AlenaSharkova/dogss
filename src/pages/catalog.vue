<script setup lang="ts">

import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import {useAdStore} from "~/stores/ad.store";
import {computed} from "vue";
import CartAdItem from "~/components/Cart/CartAdItem.vue";
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
import BaseMiniBlock from "~/components/Base/BaseMiniBlock.vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";
import type {AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";

const route = useRoute();
const adStore = useAdStore()
adStore.updateAdList()

const breedsStore = useBreedsStore()
const filterStore = useFilterStore()
const regionsStore = useRegionsStore()
const router = useRouter();

breedsStore.updateBreedsList()
const updateList = () => {
  getCreate()
}

const adList = computed(() => adStore.adCatalogList )

const title = ref('')

const queryBreeds = ref<string[]>([])
const queryType = ref<string>('')
const queryRegion = ref<string>('')
const queryBreedsObj = ref<ISelectComponent[]| null>(null)
const queryTypeObj = ref< ISelectComponent | null>(null)
const queryRegionObj = ref< ISelectComponent | null>(null)


onBeforeUpdate(async () => {
  await getCreate()
  //document.title = title.value

  useHead({
    title: `Dogs - ${title.value || '' }`,
  });
})



const getCreate = async () => {
  const query = route.query as AdQueryFilterStruct

  await adStore.updateAdList(query)

  queryBreeds.value = route.query.breeds? (route.query.breeds as string).split(',') : []
  queryType.value = route.query.type as string || ''
  queryRegion.value = route.query.regios as string || ''

  if(queryBreeds.value?.length) {
    if(!breedsStore.breedsList) await breedsStore.updateBreedsList()

    if(breedsStore.breedsList) {
      queryBreedsObj.value = queryBreeds.value
          .map(queryBreedItem =>
              breedsStore.breedsList?.find(item => String(item.value) === queryBreedItem ) as ISelectComponent
          )
    }
  } else queryBreedsObj.value = null

  if(queryRegion.value?.length) {
    if(!regionsStore.regionsList) await regionsStore.updateRegionsListFull()

    if(regionsStore.regionsListFull) {
      queryRegionObj.value = regionsStore.regionsListFull.find(item => String(item.value) === queryRegion.value ) || null
    }
  } else queryRegionObj.value = null

  if(queryType.value ) {
    queryTypeObj.value = filterStore.typeAdList.find(item => String(item.value) === queryType.value ) || null
  } else queryTypeObj.value = null


  title.value =  (queryBreedsObj.value?.length == 1 ? queryBreedsObj.value[0].text : 'Собаки') + " " +
      (queryTypeObj.value?.text || '').toLowerCase()
      + " в " + (queryRegionObj.value?.text || "России")


}

await getCreate()


useHead({
  title: `Dogs - ${title.value || '' }`,
});
</script>

<template>
  <div class="page-catalog">
    <LayoutWrapperPage>
      <h1 class="page-catalog__title" >{{title}}</h1>
        <div v-if="(queryBreedsObj?.length || 0 ) > 1" class="page-catalog__breeds">
          <BaseMiniBlock
              v-for="(breed, index) in queryBreedsObj"
              :key="index"
              :text="breed.text" />
        </div>

      <div class="page-catalog__main">
        <AdWrapperList has-filter>
          <CartAdItem
              v-for="(item, index) in adList"
              :key="index"
              :item="item" />
        </AdWrapperList>

        <AdFilter class="page-catalog__main-filter"/>

      </div>
      <br />
      <BaseButton type="primary" @click="updateList()"  text="Обновить"/>
    </LayoutWrapperPage>

  </div>
</template>

<style scoped lang="scss">
.page-catalog {
  &__title {
    @include h3;
    margin: 25px 0 20px;
  }
  &__breeds {
    display: flex;
    gap: 12px;
    margin-bottom: 45px;
    flex-wrap: wrap;
  }
  &__main {
    position: relative;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    @media (max-width: $sm) {
      flex-direction: column-reverse;
    }
    &-filter {
      position: sticky;
      top: 100px;
      @media (max-width: $sm) {
        position: static;
        width: 100%;
      }
    }
  }
}
</style>