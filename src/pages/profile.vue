<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";

const authStore = useAuthStore()

</script>

<template>
  <LayoutWrapperPage class="page-login">
    userData: {{authStore.userData}}
  </LayoutWrapperPage>
</template>

<style scoped lang="scss">
.page-login {
  margin-top: 20px;
}
</style>