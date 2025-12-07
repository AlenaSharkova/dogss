<script setup lang="ts">
import type { AdListApiDetails} from "~/struct/Ad/AdItemStruct";
import {da} from "cronstrue/dist/i18n/locales/da";

const props = defineProps({
  data: {
    type: Object as PropType<AdListApiDetails | null>,
    default: null
  }
})
const emit = defineEmits(["change-page"]);

const maxPages = computed(() => props.data? Math.ceil(props.data?.count / props.data?.limit): 0)
const activePage = computed(() => props.data? props.data?.offset / props.data?.limit  + 1 : 0)

const changePage = (page: (number | {points: number})) => {
  let pageNumber
  if(typeof page !== 'number') {
    pageNumber = page.points
  } else pageNumber = page
  if(page == activePage.value || !props.data ) return
  emit('change-page', (pageNumber -1) * props.data.limit )
}

const pagesList = computed(() => {
  if (maxPages.value <= 4) return Array(maxPages.value).fill(0).map((item, index) => index+1)
  if (activePage.value <= 4) return [1, 2, 3, 4, 5, {'points': 6}, maxPages.value]
  if (activePage.value >= maxPages.value - 2) return [1, {'points': maxPages.value - 4}, maxPages.value-3, maxPages.value-2, maxPages.value-1, maxPages.value]
  return [1, {'points':  activePage.value - 2}, activePage.value - 1, activePage.value, activePage.value + 1, {'points': activePage.value + 2}, maxPages.value]
})
</script>

<template>
  <div v-if="data && maxPages > 1" class="pagination-list">
    <div class="pagination-list__wrapper">
      <div class="pagination-list__pages">
        <div v-for="(page, index) in pagesList"
             :key="index"
             class="pagination-list__pages-number"
             :class="{active: activePage === page}"
             @click="changePage(page)"
        >
          <span v-if="typeof page === 'number'">{{page}}</span>
          <span v-else>...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination-list {
  width: 100%;
  &__wrapper {
    padding: 20px 0;
  }
  &__pages {
    display: flex;
    gap: 5px;
    align-items: center;
    &-number {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      background-color: $white-text;
      color: $dark-text;
      display: flex;
      justify-content: center;
      align-items: center;
      @include subtitle-small(500);
      transition: all 0.1s;
      cursor: pointer;
      box-shadow: $box-shadow-lite;
      &:hover {
        //TODO: (design) придумать hover, как и для кнопки базовой
      }
      &.active {
        background-color: $violet;
        color: $white-text;
      }
    }
  }
}
</style>