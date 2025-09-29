<script setup lang="ts">
import {computed, type PropType} from "vue";
import type {UserItemPublicAdStruct, UserItemPublicStruct} from "~/struct/User/UserItemStruct";

const props = defineProps({
  adsList: {
    type: Object as PropType<UserItemPublicAdStruct>,
    default: null
  }
})

const tabTypeAdList = computed( () => [
  {
    text: `Активные ( ${props.adsList?.ad_active?.length || 0} )`,
    value: 'active',
  },
  {
    text: `Завершённые ( ${props.adsList?.ad_archive_success?.length || 0} )`,
    value: 'archive-success',
  },
  {
    text: `Закрытые ( ${props.adsList?.ad_archive_close?.length || 0} )`,
    value: 'archive-close',
  }
])

const activeTab = ref(tabTypeAdList.value.find(item => item.value === 'active'))
const selectTabTypeAd = ref(activeTab.value)

const emptyBlock = computed(() => {
  switch (selectTabTypeAd.value?.value) {
    case 'active': return !props.adsList?.ad_active?.length
    case 'archive-success': return !props.adsList?.ad_archive_success?.length
    case 'archive-close': return !props.adsList?.ad_archive_close?.length
    default: return true
  }
})
</script>

<template>
  <div class="user-page-ads">
    <div class="user-page-ads__row">
      <BaseTabSwitch :items="tabTypeAdList" v-model="selectTabTypeAd" name="user-page-ads-tab"/>
      <CommonEmptyBlock
          v-if="emptyBlock"
          text="Таких объявлений нет"
          mini-style
      />
      <AdWrapperList v-else-if="adsList">

        <CardAdItem
            v-if="selectTabTypeAd?.value === 'active'"
            v-for="item in adsList.ad_active"
            :key="item.id"
            :item="item"
        />
        <!--TODO: пустой список common-->
        <CardAdItem
            v-if="selectTabTypeAd?.value === 'archive-success'"
            v-for="item in adsList.ad_archive_success"
            :key="item.id"
            :item="item"
        />
        <CardAdItem
            v-if="selectTabTypeAd?.value === 'archive-close'"
            v-for="item in adsList.ad_archive_close"
            :key="item.id"
            :item="item"
        />
      </AdWrapperList>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-page-ads {
  &__row {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>