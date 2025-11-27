<script setup lang="ts">
import {computed} from "vue";
import RegionsItem from "~/components/Regions/RegionsItem.vue";

const regionsStore = useRegionsStore()


await regionsStore.updateRegionsListFull()
const regionsListFull = computed(() => regionsStore.regionsListFull)


</script>

<template>

  <div
      class="regions-list"
  >
    <div v-if="regionsListFull?.length" class="regions-list__row">
      <RegionsItem
          v-for="(region, indexRegion) in regionsListFull"
          :key="indexRegion"
          :region-item="region"
          :name="`125-${indexRegion}`"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>