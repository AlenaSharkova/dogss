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

const aboutHtmlBlock = ref<HTMLElement | null>(null);
const adsHtmlBlock = ref<HTMLElement | null>(null);
const contactsHtmlBlock = ref<HTMLElement | null>(null);
const commentsHtmlBlock = ref<HTMLElement | null>(null);

const getBlockHtml = (id: string) => {
  switch (id) {
    case 'about': return aboutHtmlBlock.value
    case 'ads': return adsHtmlBlock.value
    case 'contacts': return contactsHtmlBlock.value
    case 'comments': return commentsHtmlBlock.value
    default: return ''
  }
}
const goToBlock = (id: string) => {

  const blockHtml = getBlockHtml(id)
  console.log('block 0', id,  blockHtml)

  if(!blockHtml) return
  scrollToBlock(blockHtml)
}
const scrollToBlock = (block: HTMLElement) => {
  console.log('block', block)
  block?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

</script>

<template>
  <div class="user-page">
    <UserPageHeader :user="user" @scroll-to-block="goToBlock" />
    <LayoutWrapperPage :isPaddingY="false" class="user-page__wrapper" >
      <div ref="aboutHtmlBlock" class="user-page__section">
        <h3 class="user-page__section-title">О нас</h3>
        <UserPageAbout class="user-page__section-block" />
      </div>
      <div ref="adsHtmlBlock" class="user-page__section">
        <h3 class="user-page__section-title">Объявления</h3>
        <UserPageAds :ads-list="user.ad_list" class="user-page__section-block" />
      </div>
      <div ref="contactsHtmlBlock" class="user-page__section">
        <h3 class="user-page__section-title">Контакты</h3>
        <CommonEmptyBlock
            v-if="!user.personal_data.contact_methods || !(Object?.keys(user.personal_data.contact_methods).length)"
            text="Контакты не предоставлены"
            mini-style
        />
        <UserContactMethodsView :contacts="user.personal_data.contact_methods" />
      </div>
      <div ref="commentsHtmlBlock" class="user-page__section">
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