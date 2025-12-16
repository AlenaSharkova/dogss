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
  BreederSiteManageStruct, BreederSiteSaveStruct
} from "~/struct/Breeder/BreederSiteStruct";
import BreedersSitePets from "~/components/Breeders/BreedersSite/BreedersSitePets.vue";
import BreedersSiteGallery from "~/components/Breeders/BreedersSite/BreedersSiteGallery.vue";
import type {ICommonUpload, IUploadImageInBase} from "~/struct/Common/ICommonUpload";
import BreedersSiteAbout from "~/components/Breeders/BreedersSite/BreedersSiteAbout.vue";
import useScreen from "~/utils/useScreen";
import type {DogChangeItemStruct} from "~/struct/Dog/DogItemStruct";
import type {AdChangeItemStruct, AdCreateItemStruct} from "~/struct/Ad/AdItemStruct";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemPublicStruct | null>,
    default: null
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
const { width } = useScreen();

const newData = ref<BreederSiteManageStruct>({
  my_dogs: null,
  photo_banner: null,
  photos_gallery: [],
  name: '',
  photo_preview: null,
  breed_specialisation: [],
  about_text: '',
})
//const sendData = ref<BreederSiteSaveStruct | null>(null)
const photoBannerList = ref(null);

const newName = ''

const pawsCount = ref(1)
const selectBreed = ref({
  value: 0,
  text: ''
})
const sectionRouteScroll = ref(route.query['section-default'] as string)
const breederSitePetsRef = ref<InstanceType<typeof BreedersSitePets>  | null>(null);
const aboutHtmlBlock = ref<HTMLElement | null>(null);
const adsHtmlBlock = ref<HTMLElement | null>(null);
const contactsHtmlBlock = ref<HTMLElement | null>(null);
const commentsHtmlBlock = ref<HTMLElement | null>(null);
const myDogsHtmlBlock = ref<HTMLElement | null>(null);
const idActiveSection = ref<UserPageSectionType | null>(null)
const sectionsElemList = ref<(HTMLElement | null)[] | null>([])
const listIncomplete = ref<string[]>([])
const isShowIncompleteModal = ref(false)
const userCurrent = ref<UserItemPublicStruct | null>(null)
const changedDogs = ref<(DogChangeItemStruct | undefined)[] | null>(null)

const formDefault = ref<BreederSiteItemStruct | null>(null)

const adList = computed(() => adStore.adCatalogList )
const breederView = computed(() => breederStore.breederView )
const breederSetting = computed(() => breederStore.breederSetting )
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
  const pageClientHeight = document.querySelector('.breeder-site')?.clientHeight
  if(pageClientHeight) {
    pawsCount.value = Math.round((window.scrollY) / 48 * (1 + (window.innerHeight + 93) / pageClientHeight)) || 1
  }
  //pawsCount.value = Math.ceil((window.pageYOffset +window.innerHeight/2 )/ 50)
}
watch(() => commonStore.scrollTopCurrent,
    newTop => {
      actionScrollPaws()
      const marginTop = 125 + 40
      //console.log('newTop', newTop)
      //console.log(sectionsElemList.value)
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
         // console.log('difference', differenceTop, differenceBottom, item.getBoundingClientRect(), document.body.offsetHeight, window.innerHeight )
          return differenceTop > 0 && differenceBottom < 0
        })
        idActiveSection.value = activeSection?.id || null
      })
    }
)
const save = () => {
  if(props.typeAction === 'create') createBreeder()
  if(props.typeAction === 'change') changeBreeder()
}
const likeChange = (form: BreederSiteItemStruct) => {
  const fieldChange = {} as BreederSiteChangeStruct
  console.log('form def', form, props.typeAction == 'change')
  if(props.typeAction !== 'change') return
  for(let id in form) {
    let item = form[id as keyof BreederSiteItemStruct]
    console.log('BreederSiteChangeStruct', formDefault.value, id)
    let itemDefault = formDefault.value[id as keyof BreederSiteItemStruct]
    if(JSON.stringify(item) !== JSON.stringify(itemDefault) && itemDefault !== undefined) {
      fieldChange[id as keyof BreederSiteChangeStruct] = item
    }
  }
  console.log('form def fieldChange 00', fieldChange)
  return fieldChange
}
const changeBreeder = async () => {
  console.log('newData.value', newData.value)
  const body = getBody('edit')
  console.log('changeData00', body)
  console.log('changeData000', likeChange(body))

  const changeData = body ? likeChange(body) : {}
  console.log('changeData010', changeData)

  if (changeData && Object.keys(changeData).length && breederSetting.value) {
    await breederStore.editBreeder(changeData, breederSetting.value.id)
        .then(res => {
          //isNavigationWithoutConfirmation.value = true
          //router.push(`/personal/publications?type=${typeSaved}`)
        }).catch(err => {
          console.error('error change Data Ad', err)
        })
  } else {
    console.error('отсутствует номер объявления или данные изменения пустые')
  }

  console.log('body00', body)
  //changedDogs
  //if(body) breederStore.createBreeder(body)
}
const createBreeder = () => {
  console.log('newData.value', newData.value)
  const body = getBody('create')
  console.log('body00', body)
  if(body) breederStore.createBreeder(body)
}
const isValidData = computed(() => {
  return (
      newData.value.name
      //&& newData.value.photo_banner
      && newData.value.photos_gallery
      && newData.value.my_dogs?.length
      && newData.value.photo_preview
      && newData.value.breed_specialisation
  )
})
const getBody = (type: 'create' | 'edit' | 'get'):  BreederSiteItemStruct| null => {
  listIncomplete.value = []

  const myDogs = breederSitePetsRef.value?.sendData()
  if(!myDogs?.length) listIncomplete.value.push('my_dogs')

  const photoBanner = getInApiPhotos(newData.value.photo_banner as ICommonUpload, true)
  if(!photoBanner) listIncomplete.value.push('photo_banner')
  const photoPreview = getInApiPhotos(newData.value.photo_preview as ICommonUpload)
  if(!photoPreview) listIncomplete.value.push('photo_preview')

  const photoGallery: IUploadImageInBase[] = newData.value.photos_gallery.reduce(
      (list: IUploadImageInBase[], item) => {
        if(item) {
          const imageObject = getInApiPhotos(item)
          if(imageObject) list.push(imageObject)
        }
        return list
      }, [])
  const breedSpecialisationIdList = newData.value.breed_specialisation.map(item => item.value)
  if(!photoGallery?.length) listIncomplete.value.push('photos_gallery')
  if(!newData.value.name) listIncomplete.value.push('name')
  if(!photoPreview) listIncomplete.value.push('photo_preview')
  if(!breedSpecialisationIdList?.length) listIncomplete.value.push('breed_specialisation')
  if(!newData.value.about_text) listIncomplete.value.push('about_text')
  if(listIncomplete.value?.length) isShowIncompleteModal.value = true
  console.log('123', myDogs?.length, photoGallery?.length
      , newData.value.name
      , newData.value.about_text
      , breedSpecialisationIdList.length
  , photoPreview)
  if(
      myDogs?.length
      && photoGallery?.length
      && newData.value.name
      && newData.value.about_text
      && breedSpecialisationIdList.length
      && photoPreview
  ) {
    return {
      name: newData.value.name,
      about_text: newData.value.about_text,
      my_dogs: myDogs,
      photo_banner: photoBanner,
      photo_preview: photoPreview,
      photos_gallery: photoGallery,
      breed_specialisation: breedSpecialisationIdList,
    }
  } return null
}
const getInApiPhotos = (photosData: ICommonUpload, isBanner = false): IUploadImageInBase | null => {
  if(!photosData?.url) return null
  const res: IUploadImageInBase = {
    url: photosData.url,
  }
  if(isBanner) res.positionBanner = photosData.positionBanner
  return res
}
const notationAboutText = (aboutText: string) => {
  newData.value.about_text = aboutText
}
const closeIncompleteModal = () => {
  isShowIncompleteModal.value = false
}
if(breederSetting.value) {
  newData.value = breederSetting.value
  userCurrent.value = breederSetting.value.ownerDetails
}
onMounted(() => {
  if(breederSetting.value) {
    console.log('onMounted 1', newData.value)
    //newData.value = breederSetting.value
    //userCurrent.value = breederSetting.value.ownerDetails
    formDefault.value = getBody('get')
    console.log('formDefault.value', formDefault.value)

  } else {
    userCurrent.value = props.user
  }
  console.log('onMounted', newData.value, breederSetting.value)
  sectionsElemList.value = [aboutHtmlBlock.value, adsHtmlBlock.value, contactsHtmlBlock.value, commentsHtmlBlock.value, myDogsHtmlBlock.value]
  const t = setTimeout(() => {
    scrollBlockFromRoute()
    actionScrollPaws()
    clearTimeout(t)
  }, 50)
})
onUnmounted(() => {
  //usersStore.userViewData = null
})
/*onBeforeRouteLeave((to, from, next) => { // Хук навигации Vue Router
  if(!props.itemChangeDateAd?.id && selectAdType.value.value && !isNavigationWithoutConfirmation.value) {
    isShowLeaveConfirmationModal.value = true;
    leavingRoute.value = to.fullPath; // Сохраняем целевой URL
    next(false); // Отменяем текущий переход
  } else {
    next(); // Разрешаем переход
  }
})*/
</script>

<template>
  <div v-if="userCurrent" class="breeder-site --manage">
    <BreedersSiteHead
        :typeAction="typeAction"
        name=""
        @scroll-to-block="goToBlock"
        v-model:section="idActiveSection"
        v-model:name-breeder="newData.name"
        v-model:banner-images="newData.photo_banner"
        v-model:photo-preview="newData.photo_preview"
    />
    newData.name: {{newData.name}}

    <LayoutWrapperPage :isPaddingY="false" :isPaddingX="false" class="breeder-site__wrapper" >
      <div ref="aboutHtmlBlock" id="about" class="breeder-site__section --about --no-padding">
        <h3 class="breeder-site__section-title">О нас</h3>
        <BreedersSiteAbout
            v-model="newData.breed_specialisation"
            :typeAction="typeAction"
            :text="newData.about_text"
            @save-about-text="notationAboutText"
            class="breeder-site__section-block"
        />
        <BreedersSiteGallery
            class="breeder-site__section-block"
            :typeAction="typeAction"
            v-model="newData.photos_gallery"
        />
      </div>
      <div ref="myDogsHtmlBlock" id="my-dogs" class="breeder-site__section">
        <h3 class="breeder-site__section-title">Наши питомцы</h3>
        <BreedersSitePets
            :dogs="newData.my_dogs"
            :typeAction="typeAction"
            ref="breederSitePetsRef"
        />
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
      <BaseButton class="breeder-site__save" text="Перейти к сохранению изменений" @click="save"/>
    </LayoutWrapperPage>
    <BreedersSiteManageIncomplete
        v-if="isShowIncompleteModal"
        :listIncomplete="listIncomplete"
        :is-show="isShowIncompleteModal"
        @close="closeIncompleteModal"
    />
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
  //overflow: hidden;
  z-index: 1;
  position: relative;
  margin-bottom: 100px;
  &__wrapper {
    margin-top: 80px;
  }
  &__section {
    z-index: 2;
    position: relative;
    padding: 0 55px 0 50px;
    margin-top: 40px;
    scroll-margin-top: 130px;
    @media (max-width: $md) {
      padding: 0 35px 0 30px;
    }
    @media (max-width: $xs) {
      padding: 0 25px 0 20px;
    }
    &.--about {
      z-index: 8;
    }
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