<script setup lang="ts">
import {type PropType, ref} from "vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {UserItemPublicPreviewStruct, UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import UserPageAds from "~/components/User/UserPage/UserPageAds.vue";
import UserContactMethodsView from "~/components/User/UserContactMethodsView.vue";
import UserPageCommentsGallery from "~/components/User/UserPage/UserPageCommentsGallery.vue";
import type {UserPageSectionType} from "~/struct/User/UserPageStruct";
import {useCommonStore} from "~/stores/common.store";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemPublicStruct>,
    required: true,
  }
})

const route = useRoute()
let observer: IntersectionObserver | null = null

const sectionRouteScroll = ref(route.query['section-default'] as string)
const aboutHtmlBlock = ref<HTMLElement | null>(null);
const adsHtmlBlock = ref<HTMLElement | null>(null);
const contactsHtmlBlock = ref<HTMLElement | null>(null);
const commentsHtmlBlock = ref<HTMLElement | null>(null);
const idActiveSection = ref<UserPageSectionType | null>(null)
const sectionsElemList = ref<(HTMLElement | null)[] | null>([])
const commonStore = useCommonStore()

const getBlockHtml = (id: string) => {
  switch (id) {
    case 'about': return aboutHtmlBlock.value
    case 'ads': return adsHtmlBlock.value
    case 'contacts': return contactsHtmlBlock.value
    case 'comments': return commentsHtmlBlock.value
    default: return null
  }
}


const goToBlock = (id: UserPageSectionType | null) => {
  const blockHtml = id && getBlockHtml(id)

  console.log('blockHtml', blockHtml, blockHtml?.offsetTop)
  scrollToBlock(blockHtml)
}
const scrollToBlock = (block: HTMLElement | null) => {
  console.log('block', block)
  if(!block) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    block?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
const scrollBlockFromRoute = () => {
  if(sectionRouteScroll.value === 'comments') goToBlock('comments')
  else if([ 'publications-active',  'publications-archive-success'].includes(sectionRouteScroll.value)) {
    goToBlock('ads')
  }
}
watch(() => commonStore.scrollTopCurrent,
  newTop => {
    const marginTop = 125 + 40
    console.log('newTop', newTop)
    console.log(sectionsElemList.value)
    if(!sectionsElemList.value) return
    window.requestAnimationFrame(() => {
      const activeSection = sectionsElemList.value?.find((item , index, arr) => {
        if(!item) return
        const differenceTop = newTop - item.offsetTop + marginTop + 40
        const differenceBottom = newTop - (item.offsetTop + item.offsetHeight - marginTop)
        const position = item.getBoundingClientRect();
        // проверка полной видимости
        const fullyVisible = position.top >= 0 && position.bottom <= window.innerHeight
        const lastElemFullyVisibleEnd = index === arr.length - 1 && fullyVisible
        console.log('difference', differenceTop, differenceBottom, item.getBoundingClientRect(), document.body.offsetHeight, window.innerHeight )
        return differenceTop > 0 && differenceBottom < 0
      })
      idActiveSection.value = activeSection?.id || null
    })
  }
)
watch(() => idActiveSection.value,
    async (newId) => {
      //goToBlock(newId)
    })
onMounted(  () => {
  //commonStore.changeIsLoadingPage(true)
  //console.log(' window.history', window.history)
  //window.history.scrollRestoration = 'auto';
  //window.history.scrollRestoration = 'manual';
  sectionsElemList.value = [aboutHtmlBlock.value, adsHtmlBlock.value, contactsHtmlBlock.value, commentsHtmlBlock.value]

  const t = setTimeout(() => {
    scrollBlockFromRoute()
    //commonStore.changeIsLoadingPage(false)
    clearTimeout(t)
  }, 50)

})

</script>

<template>
  <div class="user-page">
    <UserPageHeader
        v-model="idActiveSection"
        :user="user"
        @scroll-to-block="goToBlock" />
    {{sectionRouteScroll}}
    {{idActiveSection}}
    <LayoutWrapperPage :isPaddingY="false" class="user-page__wrapper" >
      <div ref="aboutHtmlBlock" id="about" class="user-page__section">
        <h3 class="user-page__section-title">О нас</h3>
        <UserPageAbout class="user-page__section-block" />
      </div>
      <div ref="adsHtmlBlock" id="ads" class="user-page__section">
        <h3 class="user-page__section-title">Объявления</h3>
        <UserPageAds :ads-list="user.ad_list" class="user-page__section-block" />
      </div>
      <div ref="contactsHtmlBlock"  id="contacts" class="user-page__section">
        <h3 class="user-page__section-title">Контакты</h3>
        <CommonEmptyBlock
            v-if="!user.personal_data.contact_methods || !(Object?.keys(user.personal_data.contact_methods).length)"
            text="Контакты не предоставлены"
            mini-style
        />
        <UserContactMethodsView :contacts="user.personal_data.contact_methods" />
      </div>
      <div ref="commentsHtmlBlock" id="comments" class="user-page__section">
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