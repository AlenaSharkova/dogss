<script setup lang="ts">
import type {PropType} from "vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {UserItemPublicPreviewStruct, UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import UserPageAds from "~/components/User/UserPage/UserPageAds.vue";


const props = defineProps({
  user: {
    type: Object as PropType<UserItemPublicStruct>,
    default: null
  }
})

</script>

<template>
  <div class="user-page">
    <UserPageHeader :user="user" />
    <LayoutWrapperPage :isPaddingY="false" class="user-page__wrapper" >
      <UserPageAbout id="about" class="user-page__block" />

      <UserPageAds id="ads" :ads-list="user.ad_list" class="user-page__block" />
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  &__block {
    scroll-margin-top: 130px;
  }
  &__wrapper {
    margin-top: 80px;
  }
}
</style>