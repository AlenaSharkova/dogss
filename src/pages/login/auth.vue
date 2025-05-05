<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";

const route = useRoute();
const authStore = useAuthStore()

onMounted(() => {

})
const getToken = () => {
  console.log('route.query.token', route.query.token)
  if(route.query.token) {
    authStore.getSessionTokenLink(route.query.token as string)

  }
}
const updateSession = () => {
  authStore.updateSession()

}
</script>

<template>
  <br>
  <br>
  <br>
<BaseButton @click="getToken" text="54545"></BaseButton>
  <br>

<BaseButton @click="updateSession" text="session"></BaseButton>
</template>

<style scoped lang="scss">

</style>