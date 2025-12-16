<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import {useAdStore} from "~/stores/ad.store";
import {useBreederStore} from "~/stores/breeder.store";
import BreedersSiteMain from "~/components/Breeders/BreedersSite/BreedersSiteMain.vue";
import {InsertTextMode} from "vscode-languageserver-types";
import asIs = InsertTextMode.asIs;

definePageMeta({
  requirementUser : null
})
const route = useRoute();
const idBreeder = ref<string | null>(null)

const usersStore = useUsersStore()
const breederStore = useBreederStore()
const breedsStore = useBreedsStore()
const adStore = useAdStore()

const pawsCount = ref(1)
const selectBreed = ref({
  value: 0,
  text: ''
})

const adList = computed(() => adStore.adCatalogList )
const breederView = computed(() => breederStore.breederView )
const breedsList = computed(() => breedsStore.breedsList )


breederStore.idRequestBreederView = route.params.id as string
await breederStore.getViewBreeder('view')
//await usersStore.getUserViewData(breederStore.idRequestBreederView)
onUnmounted(() => {
  //usersStore.userViewData = null
  breederStore.breederView = null
})
</script>

<template>
  <div class="page-breeder">
    <BreedersSiteMain />
  </div>
</template>

<style scoped lang="scss">

</style>
<style lang="scss">
.page-breeder {
  width: 100%;
}
</style>