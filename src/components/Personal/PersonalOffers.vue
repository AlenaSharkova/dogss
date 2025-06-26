<script setup lang="ts">

import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";

const authStore = useAuthStore()

const userFullData = computed(() => authStore.userFullData)
const userFullName = computed(() => `${userFullData.value?.personal_data.last_name} ${userFullData.value?.personal_data.first_name}` )

</script>

<template>
  <div class="personal-profile-offers">
  </div>
</template>

<style scoped lang="scss">

</style>