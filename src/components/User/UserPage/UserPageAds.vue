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
    text: `Активные ( ${props.adsList?.active?.length || 0} )`,
    value: 'active',
  },
  {
    text: `Архив ( ${props.adsList?.archive?.length || 0} )`,
    value: 'archive',
  }
])

const activeTab = ref(tabTypeAdList.value.find(item => item.value === 'active'))
const selectTabTypeAd = ref(activeTab.value)

</script>

<template>
  <div class="user-page-ads">
    <div class="user-page-ads__text">
      <h3>Объявления</h3>
    </div>
    <div class="user-page-ads__row">
      <BaseTabSwitch :items="tabTypeAdList" v-model="selectTabTypeAd" />
      <AdWrapperList v-if="adsList">
        <CartAdItem
            v-if="selectTabTypeAd?.value === 'active'"
            v-for="item in adsList.active"
            :key="item.id"
            :item="item"
        />
        <!--TODO: пустой список common-->
        <CartAdItem
            v-if="selectTabTypeAd?.value === 'archive'"
            v-for="item in adsList.archive"
            :key="item.id"
            :item="item"
        />
      </AdWrapperList>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-page-ads {

  &__text {
    text-align: center;
    @include h3();
    margin-bottom: 40px;
  }
  &__row {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>