<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import {useAdStore} from "~/stores/ad.store";
import { useBreederStore} from "~/stores/breeder.store";
import {useAuthStore} from "~/stores/auth.store";
import BreedersSiteManage from "~/components/Breeders/BreedersSite/BreedersSiteManage.vue";

definePageMeta({
  requirementUser : 'authorized'
})
const route = useRoute();
const idBreeder = ref<string | null>(null)

const usersStore = useUsersStore()
const breederStore = useBreederStore()
const breedsStore = useBreedsStore()
const commonStore = useCommonStore()
const adStore = useAdStore()
const authStore = useAuthStore()
const router = useRouter();

const pawsCount = ref(1)
const isHasBreeder = ref(false)
const selectBreed = ref({
  value: 0,
  text: ''
})

const adList = computed(() => adStore.adCatalogList )
const breederView = computed(() => breederStore.breederView )
const breedsList = computed(() => breedsStore.breedsList )
const userFullData = computed(() => authStore.userFullData)
const idMyBreeder = computed(() => breederStore.idMyBreeder)

const getData = async (userId: number) => {
  if(idMyBreeder.value) {
    isHasBreeder.value = true
    commonStore.infoResultModal = {
      status: 'error',
      title: "У Вас уже есть питомник"
    }
    router.back()
  } else {
    await nextTick()
    await usersStore.getUserViewData(userId, true)
  }
}
if( userFullData.value?.id) {
  getData(userFullData.value.id)
}
watch(() => userFullData.value?.id,
    (newIdCurrentUser) => {
      console.log('newIdCurrentUser', newIdCurrentUser)
      if(!newIdCurrentUser) return
      getData(newIdCurrentUser)
    })
onUnmounted(() => {
  usersStore.userForBreederViewData = null
})
</script>

<template>
  <div class="page-breeder-create">

    <BreedersSiteManage :user="usersStore.userForBreederViewData" type="create" />
  </div>
</template>

<style scoped lang="scss">

</style>
<style lang="scss">
.page-breeder-create {
  width: 100%;
  overflow: hidden;
}
</style>