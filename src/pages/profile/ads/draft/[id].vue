<script setup lang="ts">
import CreateAd from "~/pages/create-ad.vue";
import FormCreateAd from "~/components/Form/FormCreateAd.vue";

const route = useRoute();

const idAdDraft = ref(route.params.id as string)

const personalStore = usePersonalStore()
const adCurrentDraft = ref()

onMounted(async () => {
  if (idAdDraft.value) {
    await personalStore.getPersonalAdCurrentDraft(idAdDraft.value)
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