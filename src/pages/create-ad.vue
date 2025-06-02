<script setup lang="ts">

import FormCreateAd from "~/components/Form/FormCreateAd.vue";

definePageMeta({
  requirementUser : null
})
</script>

<template>
  <div class="page-create-ad">
    <FormCreateAd />
  </div>


</template>

<style scoped lang="scss">
.page-create-ad {
  padding-top: 80px;
}
</style>