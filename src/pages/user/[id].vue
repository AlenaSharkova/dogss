<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";

definePageMeta({
  requirementUser : null,
  scrollToTop: false
})
const route = useRoute();
const idUser = ref<string | null>(null)

const usersStore = useUsersStore()

const userViewData = computed(() => usersStore.userViewData )

idUser.value = route.params.id as string

usersStore.getUserViewData(idUser.value)

const router = useRouter()

onMounted(() => {

})

onBeforeMount(() => {
  usersStore.userViewData = null
})

</script>

<template>
  <div class="page-user">
    <UserPage :user="userViewData" v-if="userViewData"/>
  </div>
</template>

<style scoped lang="scss">
.page-user {
  width: 100%;
}
</style>
<style lang="scss">

.page-breeder__gallery-swiper {
  .swiper-wrapper {
    align-items: center;
  }
}
</style>