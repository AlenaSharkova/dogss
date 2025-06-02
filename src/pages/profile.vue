<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";

definePageMeta({
  requirementUser : 'authorized'
})

const authStore = useAuthStore()

const userFullData = computed(() => authStore.userFullData)

onMounted( () => {
  //мб не надо
  if (authStore.statusUser === 'unknown') {
   // authStore.getUserFullData()
  }
})
</script>

<template>
  <div class="page-profile">
    <LayoutWrapperPage >
      <div v-if="userFullData" class="page-profile__header">
        <div class="page-profile__header-title">
          <span>Профиль</span>
        </div>
        <div class="page-profile__header-name">

        </div>
      </div>
      userFullData: {{authStore.userFullData}}
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-profile {
  margin-top: 20px;
}
</style>