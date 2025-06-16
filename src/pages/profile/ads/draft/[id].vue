<script setup lang="ts">
import CreateAd from "~/pages/create-ad.vue";
import FormCreateAd from "~/components/Form/FormCreateAd.vue";

const route = useRoute();

const adIdDraft = ref(route.params.id as string)

const personalStore = usePersonalStore()
const adCurrentDraft = ref()

onMounted(async () => {
  if (adIdDraft.value) {
    await personalStore.getPersonalAdCurrentDraft(adIdDraft.value)
    adCurrentDraft.value = personalStore.AdPersonalCurrentItemDraft
  }
})

</script>

<template>
  <div class="page-ads-draft">
    <LayoutWrapperPage >
      <BaseWrapperWithDogs image="dolmatian">
        {{adCurrentDraft}}
        <FormCreateAd v-if="adCurrentDraft" :itemDraftAd="adCurrentDraft"/>
      </BaseWrapperWithDogs>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">

</style>