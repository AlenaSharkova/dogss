<script setup lang="ts">
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import AdFilter from "~/components/Ad/AdFilter.vue";
import {useAdStore} from "~/stores/ad.store";
import {computed, ref} from "vue";
import CardAdItem from "~/components/Card/CardAdItem.vue";
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
import BaseMiniBlock from "~/components/Base/BaseMiniBlock.vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";
import type {AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";
import type {UserPageSectionType} from "~/struct/User/UserPageStruct";

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

const queryBreeds = ref<string[]>([])
const queryType = ref<string>('')
const queryRegion = ref<string>('')
const queryTypeObj = ref< ISelectComponent | null>(null)
const lastQuery = ref< AdQueryFilterStruct | null>(null)

const statusUser = computed(() => authStore.statusUser)
const queryBreedsObj = computed<ISelectComponent[]| null>(() => adStore?.adCatalogFilter.breeds || null)
const queryRegionObj = computed(() => adStore?.adCatalogFilter.breeds || null)
const title = computed<ISelectComponent[] | null>(() => {
  return (queryBreedsObj.value?.length == 1 ? queryBreedsObj.value[0].text : 'Собаки') + " " +
  (queryTypeObj.value?.text || '').toLowerCase()
  + " в " + (queryRegionObj.value?.length ? queryRegionObj.value[0].text : "России")
})

const adListHtmlBlock = ref<HTMLElement | null>(null);


const getCreateReq = async ( offset = 0 as number, isClient = false  ) => {
  const queryRoute = route.query as AdQueryFilterStruct
  const query = {
    ...queryRoute,
  }
  lastQuery.value = query
  await adStore.updateAdFilter(query)
  console.log('adCatalogFilter', adStore.adCatalogFilter)
}

const changePage = (offset: number) => {
  router.push({query: { ...route.query, offset: offset }})
}

await getCreateReq()

const goToAdList = () => {
  scrollToBlock(adListHtmlBlock.value)
}
const scrollToBlock = (block: HTMLElement | null) => {
  if(!block) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    block?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

watch(() => route.fullPath,
    async () => {
      await getCreateReq()
      goToAdList()
      useHead({
        title: `Dogs - ${title.value || '' }`,
      });
    })

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
          <div ref="adListHtmlBlock" class="page-catalog__main-listing">
            <AdWrapperList has-filter :empty="!adList?.length">
              <CardAdItem
                  v-for="(item, index) in adList"
                  :key="index"
                  :item="item" />
            </AdWrapperList>
            <CommonPaginationList
                :data="adListDetails"
                @change-page="changePage" />
          </div>
          <AdFilter class="page-catalog__main-filter"/>
        </div>
      </div>
      <br />
    </LayoutWrapperPage>

  </div>
</template>

<style scoped lang="scss">
.page-catalog {
  width: 100%;
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
    min-height: 800px;
    &-block {
      flex: 1;
      position: relative;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      @media (max-width: $sm) {
        flex-direction: column-reverse;
      }
    }
    &-listing {
      width: 100%;
      scroll-margin-top: 80px;
    }
    &-filter {
      flex: 1;
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