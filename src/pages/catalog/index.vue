<script setup lang="ts">
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import {useAdStore} from "~/stores/ad.store";
import {computed} from "vue";
import CardAdItem from "~/components/Card/CardAdItem.vue";
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
import BaseMiniBlock from "~/components/Base/BaseMiniBlock.vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";
import type {AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";

definePageMeta({
  requirementUser : null
})
const route = useRoute();
const adStore = useAdStore()
const authStore = useAuthStore()

const breedsStore = useBreedsStore()
const filterStore = useFilterStore()
const regionsStore = useRegionsStore()
const router = useRouter();

//breedsStore.updateBreedsList()


const adList = computed(() => adStore.adCatalogList )
const adListDetails = computed(() => adStore.adCatalogListDetails )

const title = ref('')

const queryBreeds = ref<string[]>([])
const queryType = ref<string>('')
const queryRegion = ref<string>('')
const queryBreedsObj = ref<ISelectComponent[]| null>(null)
const queryTypeObj = ref< ISelectComponent | null>(null)
const queryRegionObj = ref< ISelectComponent[] | null>(null)
const lastQuery = ref< AdQueryFilterStruct | null>(null)

const isMounted = ref(false);

const getCreateReq = async ( offset = 0 as number, isClient = false  ) => {
  const queryRoute = route.query as AdQueryFilterStruct
  const query = {
    ...queryRoute,
    offset
  }
  lastQuery.value = query
  console.log('getCreateReq', authStore.isUseCookie, process.client + '00', process.browser, process.server + '', window )
  if(!isClient) await adStore.updateAdList(query)
  else await adStore.updateAdListClient(query)
  console.log('adCatalogFilter', adStore.adCatalogFilter)

  queryBreedsObj.value = adStore?.adCatalogFilter.breeds || null
  queryRegionObj.value = adStore?.adCatalogFilter.regions || null

  title.value =  (queryBreedsObj.value?.length == 1 ? queryBreedsObj.value[0].text : 'Собаки') + " " +
      (queryTypeObj.value?.text || '').toLowerCase()
      + " в " + (queryRegionObj.value?.length? queryRegionObj.value[0].text: "России")
}
if(authStore.isUseCookie || process.server) await getCreateReq()
const statusUser = computed(() => authStore.statusUser)

onMounted( () => {
  if(statusUser.value === 'active' && !authStore.isUseCookie) {
    console.log('onMounted')
    isMounted.value = true
    getCreateReq(0, true)
  }
})

watch(() => route.fullPath,
    async () => {
      await getCreateReq()
      useHead({
        title: `Dogs - ${title.value || '' }`,
      });
    })

const changePage = (offset: number) => {
  getCreateReq(offset)
}

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
        <div class="page-catalog__main-sorting">
          <AdSorting />
        </div>
        <div class="page-catalog__main-block">
          <div v-if="adList?.length" class="page-catalog__main-listing">
            <AdWrapperList has-filter>
              <CardAdItem
                  v-for="(item, index) in adList"
                  :key="index"
                  :item="item" />
            </AdWrapperList>
            <CommonPaginationList
                :data="adListDetails"
                @change-page="changePage" />
          </div>
          <div v-else>
            не найдено
          </div>
          <AdFilter class="page-catalog__main-filter"/>
        </div>
      </div>
      <br />
      <BaseButton type="primary" @click="getCreateReq()"  text="Обновить"/>
    </LayoutWrapperPage>

  </div>
</template>

<style scoped lang="scss">
.page-catalog {
  &__title {
    @include h2;
    margin: 25px 0 20px;
  }
  &__breeds {
    display: flex;
    gap: 12px;
    margin-bottom: 45px;
    flex-wrap: wrap;
  }
  &__main {
    display: flex;
    flex-direction: column;
    gap: 12px;
    &-block {
      position: relative;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      @media (max-width: $sm) {
        flex-direction: column-reverse;
      }
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