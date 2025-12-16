<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import {useAdStore} from "~/stores/ad.store";
import {useBreederStore} from "~/stores/breeder.store";
import BreedersSiteMain from "~/components/Breeders/BreedersSite/BreedersSiteMain.vue";
import {InsertTextMode} from "vscode-languageserver-types";
import asIs = InsertTextMode.asIs;

definePageMeta({
  requirementUser : 'authorized'
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
const breederSetting = computed(() => breederStore.breederSetting )
const breedsList = computed(() => breedsStore.breedsList )


breederStore.idRequestBreederView = route.params.id as string
await breederStore.getViewBreeder('setting')
//await usersStore.getUserViewData(breederStore.idRequestBreederView)
onUnmounted(() => {
  //usersStore.userViewData = null
  breederStore.breederSetting = null
})
</script>

<template>
  <div class="page-breeder">
    <BreedersSiteManage
        typeAction="change"
        :user="breederSetting?.ownerDetails"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
<style lang="scss">
.page-breeder {
  width: 100%;
}
</style>