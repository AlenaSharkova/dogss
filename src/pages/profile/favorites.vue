<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";
import CommonModalFile from "~/components/Common/CommonModalFile.vue";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import ProfileAd from "~/components/Profile/ProfileAd.vue";
import ProfileFavorites from "~/components/Profile/ProfileFavorites.vue";

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
  <div class="page-ads-favorite">
    <LayoutWrapperPage >
      <div class="page-ads-favorite__header">
        <div class="page-ads-favorite__header-title">
          <h1>Избранные объявления</h1>
        </div>
      </div>
      <ProfileFavorites />
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-ads-favorite {
  width: 100%;
  margin-top: 20px;
  &__header {
    margin-bottom: 20px;
    &-title {
      @include h1;
    }
  }
}
</style>