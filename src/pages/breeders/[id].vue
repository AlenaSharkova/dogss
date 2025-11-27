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
const userViewData = computed(() => usersStore.userViewData )

const actionScrollPaws = () => {
  window.addEventListener('scroll', () => {
    const pageClientHeight = document.querySelector('.page-breeder')?.clientHeight
    if(pageClientHeight) {
      pawsCount.value = Math.round((window.scrollY) / 48 * (1 + (window.innerHeight + 93) / pageClientHeight)) || 1
      //console.log(window.scrollY, pageClientHeight, pawsCount.value)
    }
    //pawsCount.value = Math.ceil((window.pageYOffset +window.innerHeight/2 )/ 50)
  })
}

breederStore.idRequestBreederView = route.params.id as string
await breederStore.getViewBreeder('view')
await usersStore.getUserViewData(breederStore.idRequestBreederView)
onMounted(async () => {
  actionScrollPaws()
})
onUnmounted(() => {
  usersStore.userViewData = null
  breederStore.breederView = null
})
</script>

<template>
  <div class="page-breeder">
    <BreedersSiteMain :user="userViewData" :breeder="breederView" />
  </div>
</template>

<style scoped lang="scss">

</style>
<style lang="scss">
.page-breeder {
  width: 100%;
}
</style>