<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import {useAdStore} from "~/stores/ad.store";
import { useBreederStore} from "~/stores/breeder.store";
import {useAuthStore} from "~/stores/auth.store";
import BreedersSiteManage from "~/components/Breeders/BreedersSite/BreedersSiteManage.vue";

definePageMeta({
  requirementUser : null
})
const route = useRoute();
const idBreeder = ref<string | null>(null)

const usersStore = useUsersStore()
const breederStore = useBreederStore()
const breedsStore = useBreedsStore()
const commonStore = useCommonStore()
const adStore = useAdStore()
const authStore = useAuthStore()

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


const actionScrollPaws = () => {
  window.addEventListener('scroll', () => {
    const pageClientHeight = document.querySelector('.page-breeder-create')?.clientHeight
    if(pageClientHeight) {
      pawsCount.value = Math.round((window.scrollY) / 48 * (1 + (window.innerHeight + 93) / pageClientHeight)) || 1
      //console.log(window.scrollY, pageClientHeight, pawsCount.value)
    }
    //pawsCount.value = Math.ceil((window.pageYOffset +window.innerHeight/2 )/ 50)
  })
}
const getData = async (userId: string | number) => {
  breederStore.idRequestBreederView = userId
  await breederStore.getViewBreeder('setting')
      .then(res => usersStore.getUserViewData(userId))
      .catch(err => {
        if(err.code === 403) {
          isHasBreeder.value = true
          commonStore.infoResultModal = {
            status: 'error',
            title: "У Вас уже есть питомник"
          }
        }
    })

}
//проверка на наличие breeder
if( userFullData.value?.id) {
  getData(userFullData.value.id)
}
watch(() => userFullData.value?.id,
    (newIdCurrentUser) => {
      console.log('newIdCurrentUser', newIdCurrentUser)
      if(!newIdCurrentUser) return
      getData(newIdCurrentUser)
    })
onMounted(() => {


  actionScrollPaws()
})
onUnmounted(() => {
  usersStore.userViewData = null
  breederStore.breederView = null
})
</script>

<template>
  <div class="page-breeder-create">
    <BreedersSiteManage :user="usersStore.userViewData" type="create" />
  </div>
</template>

<style scoped lang="scss">

</style>
<style lang="scss">
.page-breeder-create {
  width: 100%;
}
</style>