<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed, type PropType, ref} from "vue";
import {useAdStore} from "~/stores/ad.store";
import BreedersSiteHead from "~/components/Breeders/BreedersSite/BreedersSiteHead.vue";
import BaseIconPaws from "~/components/Base/BaseIcon/BaseIconPaws.vue";
import {useBreederStore} from "~/stores/breeder.store";
import UserPageAds from "~/components/User/UserPage/UserPageAds.vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import UserPageCommentsGallery from "~/components/User/UserPage/UserPageCommentsGallery.vue";
import UserContactMethodsView from "~/components/User/UserContactMethodsView.vue";
import type {UserPageSectionType} from "~/struct/User/UserPageStruct";
import {useCommonStore} from "~/stores/common.store";
import type {
  BreederSiteChangeStruct,
  BreederSiteItemStruct,
  BreederSiteManageStruct
} from "~/struct/Breeder/BreederSiteStruct";
import BreedersSitePets from "~/components/Breeders/BreedersSite/BreedersSitePets.vue";
import BreedersSiteGallery from "~/components/Breeders/BreedersSite/BreedersSiteGallery.vue";
import type {ICommonUpload, IUploadImageInBase} from "~/struct/Common/ICommonUpload";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemPublicStruct | null>,
    default: null
  },

  breeder: {
    type: Object as PropType<BreederSiteItemStruct | null>,
    default: null,
  },
  typeAction: {
    type: String as PropType< 'create' | 'change'>,
    default: 'create'
  },
})
const route = useRoute();
const idBreeder = ref<string | null>(null)

const usersStore = useUsersStore()
const breederStore = useBreederStore()
const breedsStore = useBreedsStore()
const adStore = useAdStore()
const commonStore = useCommonStore()

const newData = ref<BreederSiteManageStruct>({
  my_dogs: null,
  photo_banner: null,
  photos_gallery: [],
  name: '',
  photo_preview: '',
  breed_specialisation: [],
  about_text: '',
})
const photoBannerList = ref(null);

const newName = ''

const pawsCount = ref(1)
const selectBreed = ref({
  value: 0,
  text: ''
})
const sectionRouteScroll = ref(route.query['section-default'] as string)
const breederSitePetsRef = ref<HTMLElement | null>(null);
const aboutHtmlBlock = ref<HTMLElement | null>(null);
const adsHtmlBlock = ref<HTMLElement | null>(null);
const contactsHtmlBlock = ref<HTMLElement | null>(null);
const commentsHtmlBlock = ref<HTMLElement | null>(null);
const myDogsHtmlBlock = ref<HTMLElement | null>(null);
const idActiveSection = ref<UserPageSectionType | null>(null)
const sectionsElemList = ref<(HTMLElement | null)[] | null>([])


const adList = computed(() => adStore.adCatalogList )
const breederView = computed(() => breederStore.breederView )
const breedsList = computed(() => breedsStore.breedsList )
const disabledSave = computed(() =>
    props.typeAction === 'create'
        ? (!newData.value.name)
        : false
)
let observer: IntersectionObserver | null = null


const getBlockHtml = (id: string) => {
  switch (id) {
    case 'about': return aboutHtmlBlock.value
    case 'ads': return adsHtmlBlock.value
    case 'contacts': return contactsHtmlBlock.value
    case 'comments': return commentsHtmlBlock.value
    case 'my-dogs': return myDogsHtmlBlock.value
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

const actionScrollPaws = () => {
  window.addEventListener('scroll', () => {
    const pageClientHeight = document.querySelector('.page-breeder')?.clientHeight
    if(pageClientHeight) {
      pawsCount.value = Math.round((window.scrollY) / 48 * (1 + (window.innerHeight + 93) / pageClientHeight)) || 1
      //console.log(window.scrollY, pageClientHeight, pawsCount.value)
    }
    //pawsCount.value = Math.ceil((window.pageYOffset +window.innerHeight/2 )/ 50)
  })
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
const save = () => {
  if(props.typeAction === 'create') createBreeder()
}
const createBreeder = () => {
  console.log('newData.value', newData.value)
  newData.value.my_dogs = breederSitePetsRef.value?.sendData()
  breederStore.createBreeder({
    ...newData.value,
    photo_banner: getInApiPhotos(newData.value.photo_banner, true),
    photos_gallery: newData.value.photos_gallery.map(item => getInApiPhotos(item))
  })
}
const getInApiPhotos = (photosData: ICommonUpload, isBanner = false): IUploadImageInBase => {
  if(!photosData?.imageUrl) return null
  const res: IUploadImageInBase = {
    url: photosData.imageUrl,
  }
  if(isBanner) res.positionBanner = photosData.positionBanner
  return res
}
const notationAboutText = (aboutText: string) => {
  newData.value.about_text = aboutText
}
onMounted(() => {

  actionScrollPaws()

  sectionsElemList.value = [aboutHtmlBlock.value, adsHtmlBlock.value, contactsHtmlBlock.value, commentsHtmlBlock.value, myDogsHtmlBlock.value]
  const t = setTimeout(() => {
    scrollBlockFromRoute()
    //commonStore.changeIsLoadingPage(false)


    clearTimeout(t)
  }, 50)
})
onUnmounted(() => {
  //usersStore.userViewData = null
})
</script>

<template>
  <div v-if="user" class="breeder-site --manage">
    <BreedersSiteHead
        :typeAction="typeAction"
        :name="breeder?.name"
        @scroll-to-block="goToBlock"
        v-model:section="idActiveSection"
        v-model:name-breeder="newData.name"
        v-model:banner-images="newData.photo_banner"
    />
    <LayoutWrapperPage :isPaddingY="false" :isPaddingX="false" class="breeder-site__wrapper" >
      <div ref="aboutHtmlBlock" id="about" class="breeder-site__section --no-padding">
        <h3 class="breeder-site__section-title">О нас</h3>
        <UserPageAbout
            v-model="newData.breed_specialisation"
            :typeAction="typeAction"
            :text="newData.about_text"
            @save-about-text="notationAboutText"
            class="breeder-site__section-block"
        />
        <BreedersSiteGallery
            class="breeder-site__section-block"
            v-model="newData.photos_gallery"
        />
      </div>
      <div ref="myDogsHtmlBlock" id="my-dogs" class="breeder-site__section">
        <h3 class="breeder-site__section-title">Наши питомцы</h3>
        <BreedersSitePets :dogs="breeder?.my_dogs" :typeAction="typeAction" ref="breederSitePetsRef"/>
      </div>

      <div ref="adsHtmlBlock" id="ads" class="breeder-site__section">
        <h3 class="breeder-site__section-title">Объявления</h3>
        <UserPageAds :ads-list="user?.ad_list" class="breeder-site__section-block" />
      </div>
      <div ref="contactsHtmlBlock"  id="contacts" class="breeder-site__section">
        <h3 class="breeder-site__section-title">Контакты</h3>
        <CommonEmptyBlock
            v-if="!user.personal_data.contact_methods || !(Object?.keys(user.personal_data.contact_methods).length)"
            text="Контакты не предоставлены"
            mini-style
        />
        <UserContactMethodsView :contacts="user.personal_data.contact_methods" />
      </div>
      <div ref="commentsHtmlBlock" id="comments" class="breeder-site__section">
        <h3 class="breeder-site__section-title">Отзывы</h3>
        <UserPageCommentsGallery :comments="user.comments"/>
      </div>
      <BaseButton class="breeder-site__save" text="Сохранить изменения" @click="save"/>
    </LayoutWrapperPage>

    <div class="breeder-site__paws">
      <TransitionGroup name="fade">

        <div class="breeder-site__paws-item"
             v-for="i in pawsCount"
             :key="i">
          <BaseIconPaws class="breeder-site__paws-item__icon"/>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="scss">
.breeder-site {
  //display: flex;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  position: relative;
  &__wrapper {
    margin-top: 80px;
  }
  &__section {
    z-index: 2;
    position: relative;
    padding: 0 55px 0 50px;
    @media (max-width: $md) {
      padding: 0 35px 0 30px;
    }
    @media (max-width: $xs) {
      padding: 0 25px 0 20px;
    }
    margin-top: 40px;
    scroll-margin-top: 130px;
    &-title {
      text-align: center;
      @include h3();
      margin-bottom: 40px;
    }
    &.--no-padding {
      padding: 0;
      .breeder-site__section-title,
      .breeder-site__section-block {
        padding: 0 55px 0 50px;
        @media (max-width: $md) {
          padding: 0 35px 0 30px;
        }
        @media (max-width: $xs) {
          padding: 0 25px 0 20px;
        }
      }
    }

  }
  &__save {
    position: fixed;
    bottom: 50px;
    z-index: 10;
  }
  &__paws {
    top: 0px;
    height: 100%;
    position: absolute;
    z-index: 0;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    transform-origin: center top;


    transform: rotate(-15deg);
    @media (max-width: $xs) {
      transform: rotate(-4deg);

      //min-width: 50px;
    }
    &-item {
      &:nth-child(2n) {
        margin-left: auto;
      }
      &__icon {
        width: 50px;
        height: 50px;
        transform: rotate(180deg);
        opacity: 0.5;
        @media (max-width: $xs) {
          width: 50px;
          height: 50px;
        }
      }

    }
  }


  &__gallery {
    position: relative;
    z-index: 2;
    width: 100%;
    @media (max-width: $sm) {
      width: 100%;
      height: auto;

    }
    &-swiper {
      padding: 25px 0;
      width: 100%;
      &__slide {
        width: 500px;
        display: flex;
        align-items: center;
        @media (max-width: $xs) {
          width: auto;
        }
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  &__content {
    padding: 0 50px;
    @media (max-width: $md) {
      padding: 0 30px;
    }
    @media (max-width: $xs) {
      padding: 0 20px;
    }

  }
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
</style>