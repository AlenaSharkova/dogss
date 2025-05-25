<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";

const route = useRoute();
const authStore = useAuthStore()

onMounted(() => {

})
const getToken = () => {
  if(route.query.code) {
    authStore.getSessionTokenLink(route.query.code as string)
  }
}
const getUserData = async () => {
  await authStore.getUserData()
}
</script>

<template>
  <br>
  <br>
  <br>
  <BaseButton @click="getToken" text="54545"></BaseButton>
  <br>

  <BaseButton @click="getUserData()" text="session"></BaseButton>
</template>

<style scoped lang="scss">

</style>