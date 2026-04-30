<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";
import CommonModalFile from "~/components/Common/CommonModalFile.vue";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import PersonalAd from "~/components/Personal/PersonalAd.vue";
import PersonalFavorites from "~/components/Personal/PersonalFavorites.vue";
import UserPageHeader from "~/components/User/UserPage/UserPageHeader.vue";
import PersonalProfile from "~/components/Personal/PersonalProfile/index.vue";

definePageMeta({
  requirementUser : 'authorized'
})

const authStore = useAuthStore()
const personalStore = usePersonalStore()

const userFullData = computed(() => authStore.userFullData)


onMounted( () => {
  //мб не надо
  if (authStore.statusUser === 'unknown') {
   // authStore.getUserFullData()
  }
})
</script>

<template>
  <div v-if="userFullData" class="page-profile">
    <LayoutWrapperPage>
      <PersonalProfile />
      <BaseButton v-if="userFullData.id_breeder" text="Редактировать питомник"  :to="`/breeders/change/${userFullData.id_breeder}`" />
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-profile {
  width: 100%;
  &__header {

  }
}
</style>