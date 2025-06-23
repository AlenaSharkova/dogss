<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";
import CommonModalFile from "~/components/Common/CommonModalFile.vue";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import PersonalAd from "~/components/Personal/PersonalAd.vue";
import PersonalFavorites from "~/components/Personal/PersonalFavorites.vue";

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
  <div class="page-personal-ads">
    <LayoutWrapperPage >

      <div v-if="userFullData" class="page-personal-ads__header">
        <div class="page-personal-ads__header-title">
          <span>Мои объявления</span>
        </div>
      </div>
      <PersonalAd />
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-personal-ads {
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