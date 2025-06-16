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
  <div class="page-profile-ads">
    <LayoutWrapperPage >

      <div v-if="userFullData" class="page-profile-ads__header">
        <div class="page-profile-ads__header-title">
          <span>Мои объявления</span>
        </div>
      </div>
      <ProfileAd />
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-profile-ads {
  margin-top: 20px;
  width: 100%;
  &__header {
    margin-bottom: 20px;
    &-title {
      @include h1();
    }
  }
}
</style>