<script setup lang="ts">
import {useAdStore} from "~/stores/ad.store";
import {computed} from "vue";
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import CardAdItem from "~/components/Card/CardAdItem.vue";

const adStore = useAdStore()

const adListAdminModeration = computed(() => adStore.adListAdminModeration )

onMounted(() => {
  adStore.updateAdListAdminModeration()
})
</script>

<template>
  <div class="page-admin-publications">
    <LayoutWrapperPage>
      <div v-if="adListAdminModeration?.length" class="page-catalog__main-listing">
        <AdWrapperList has-filter>
          <CardAdItem
              v-for="(item, index) in adListAdminModeration"
              :key="index"
              :item="item" />
        </AdWrapperList>
      </div>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">

</style>