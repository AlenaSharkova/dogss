<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";
import CommonModalFile from "~/components/Common/CommonModalFile.vue";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import ProfileAd from "~/components/Profile/ProfileAd.vue";

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
      <br><br><br><br>
      <ProfileAd />
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-profile {
  margin-top: 20px;
}
</style>