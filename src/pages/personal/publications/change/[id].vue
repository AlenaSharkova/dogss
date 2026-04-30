<script setup lang="ts">
import CreateAd from "~/pages/create-ad.vue";
import FormCreateAd from "~/components/Form/FormCreateAd.vue";

definePageMeta({
  requirementUser : 'authorized'
})
const route = useRoute();

const adId = ref(route.params.id as string)
const typeAd = ref(route.query.type as string)

const personalStore = usePersonalStore()
const personalAdStore = usePersonalAdStore()

const adCurrentChange = ref()

onMounted(async () => {
  if (adId.value && typeAd.value === 'draft') {
    await personalAdStore.getPersonalAdCurrentDraft(adId.value)
    adCurrentChange.value = personalAdStore.AdPersonalCurrentItemDraft
  } else if (adId.value && typeAd.value === 'active') {
    await personalAdStore.getPersonalAdCurrentActive(adId.value)
    adCurrentChange.value = personalAdStore.AdPersonalCurrentItemActive
  }
})

</script>

<template>
  <div class="page-ads-draft">
    <LayoutWrapperPage >
      <BaseWrapperWithDogs image="dolmatian">
        <FormCreateAd v-if="adCurrentChange" :itemChangeDateAd="adCurrentChange" />
      </BaseWrapperWithDogs>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">

</style>