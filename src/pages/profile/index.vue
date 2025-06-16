<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";
import CommonModalFile from "~/components/Common/CommonModalFile.vue";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import ProfileAd from "~/components/Profile/ProfileAd.vue";
import ProfileFavorites from "~/components/Profile/ProfileFavorites.vue";

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
          <h1>Профиль</h1>
        </div>
        <div class="page-profile__header-name">

        </div>
      </div>
      userFullData: {{authStore.userFullData}}
      <BaseButton text="Мои объявления" to="/profile/ads" />
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-profile {
  width: 100%;
  margin-top: 20px;
  &__header {
    margin-bottom: 20px;
    &-title {
      @include h1();
    }
  }
}
</style>