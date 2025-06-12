<script setup lang="ts">

import FormCreateAd from "~/components/Form/FormCreateAd.vue";

definePageMeta({
  requirementUser : 'authorized'
})

const authStore = useAuthStore()
</script>

<template>
  <div class="page-create-ad">
    <LayoutWrapperPage >
      <BaseWrapperWithDogs image="dolmatian">
        <FormCreateAd />
      </BaseWrapperWithDogs>
    </LayoutWrapperPage>
  </div>


</template>

<style scoped lang="scss">
.page-create-ad {
  width: 100%;
}
</style>