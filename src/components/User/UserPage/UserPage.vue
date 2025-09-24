<script setup lang="ts">
import type {PropType} from "vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {UserItemPublicPreviewStruct, UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import UserPageAds from "~/components/User/UserPage/UserPageAds.vue";
import UserContactMethodsView from "~/components/User/UserContactMethodsView.vue";
import UserPageCommentsGallery from "~/components/User/UserPage/UserPageCommentsGallery.vue";


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
      <div class="user-page__section">
        <h3 class="user-page__section-title">О нас</h3>
        <UserPageAbout id="about" class="user-page__section-block" />
      </div>
      <div class="user-page__section">
        <h3 class="user-page__section-title">Объявления</h3>
        <UserPageAds id="ads" :ads-list="user.ad_list" class="user-page__section-block" />
      </div>
      <div class="user-page__section">
        <h3 class="user-page__section-title">Контакты</h3>
        <UserContactMethodsView :contacts="user.personal_data.contact_methods" />
      </div>
      <div class="user-page__section">
        <h3 class="user-page__section-title">Отзывы</h3>
        <UserPageCommentsGallery :comments="user.comments"/>
      </div>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  margin-bottom: 40px;
  &__section {
    margin-top: 40px;
    scroll-margin-top: 130px;
    &-title {
      text-align: center;
      @include h3();
      margin-bottom: 40px;
    }
  }
  &__wrapper {
    margin-top: 80px;
  }
}
</style>