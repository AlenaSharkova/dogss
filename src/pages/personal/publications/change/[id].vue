<script setup lang="ts">
import CreateAd from "~/pages/create-ad.vue";
import FormCreateAd from "~/components/Form/FormCreateAd.vue";

const route = useRoute();

const adId = ref(route.params.id as string)
const typeAd = ref(route.query.type as string)

const personalStore = usePersonalStore()
const adCurrentChange = ref()

onMounted(async () => {
  if (adId.value && typeAd.value === 'draft') {
    await personalStore.getPersonalAdCurrentDraft(adId.value)
    adCurrentChange.value = personalStore.AdPersonalCurrentItemDraft
  } else if (adId.value && typeAd.value === 'active') {
    await personalStore.getPersonalAdCurrentActive(adId.value)
    adCurrentChange.value = personalStore.AdPersonalCurrentItemActive
  }
})

</script>

<template>
  <div class="page-ads-draft">
    <LayoutWrapperPage >
      <BaseWrapperWithDogs image="dolmatian">
        <FormCreateAd v-if="adCurrentChange" :itemChangeDateAd="adCurrentChange" :isDraftAd="typeAd === 'draft'"/>
      </BaseWrapperWithDogs>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">

</style>