<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed, ref} from "vue";
import {useAdStore} from "~/stores/ad.store";
import { FreeMode, Navigation, Thumbs, Mousewheel} from 'swiper/modules';
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
import useScreen from "~/utils/useScreen";
import UserContactMethodsView from "~/components/User/UserContactMethodsView.vue";
import type Swiper from "swiper";
import type {UserContactMethodsOptimalStruct} from "~/struct/User/UserItemStruct";
import {coordinatesStyleSingle} from "~/utils/croppedImage";

definePageMeta({
  requirementUser : null
})
const route = useRoute();

const usersStore = useUsersStore()
const commonStore = useCommonStore()
const { isMobile } = useScreen();
const adStore = useAdStore()
const authStore = useAuthStore()
const { width } = useScreen();

const idPublication = ref<string | null>(null)
idPublication.value = route.params.id as string
const modules = ref([FreeMode, Navigation, Thumbs])
const thumbsSwiper = ref<Swiper | null>(null);
const contactsHtmlBlock = ref<HTMLElement | null>(null);
const cardItemHTML = ref<HTMLElement | null>(null)
const cardAdditionItemHTML = ref<HTMLElement | null>(null)
const displayContainerWidth = ref(0)
const imageStylesMap = ref<Record<string | number, Record<string, string>>>({})

const statusUser = computed(() => authStore.statusUser)
const adView = computed(() => adStore.adView )
const contacts = computed(() => adView.value?.ownerDetails.personal_data.contact_methods as UserContactMethodsOptimalStruct<string>)

await adStore.getViewAd(idPublication.value)

const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper;
};
const showZoomPhotos = (photoClick: string) => {
  if(!adView.value) return
  commonStore.addZoomPhotosGallery({
    list: adView.value.photos.map(imgObj => imgObj.url),
    active_photo: photoClick
  })
}
const goToContacts = () => {
  contactsHtmlBlock.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const coordinatesStyleUpdate = async () => {
  console.log('coordinatesStyleUpdate', cardItemHTML.value, adView.value?.photos )
  if(!cardItemHTML.value || !adView.value?.photos) return null
  for (const dataImg of adView.value.photos) {
    const index = adView.value.photos.indexOf(dataImg);
    imageStylesMap.value[index] = await coordinatesStyleSingle(dataImg, index, displayContainerWidth.value, cardItemHTML.value);
  }
}
const getImageStyle = (id: string | number) => {
  return imageStylesMap.value[id] || {}; // Возвращаем стили по ID или пустой объект, если их нет
}
watch(() => width.value,
    async () => {
      displayContainerWidth.value = cardItemHTML.value?.clientWidth || 0
      await coordinatesStyleUpdate()
    }
)
watch(() => adView.value?.photos,
    async () => {
      displayContainerWidth.value = cardItemHTML.value?.clientWidth || 0
      await coordinatesStyleUpdate()
    }
)
onMounted(async () => {
  await nextTick()
  displayContainerWidth.value = cardItemHTML.value?.clientWidth || 0
  await coordinatesStyleUpdate()
})
onUnmounted(() => {
  adStore.clearViewAd()
})
</script>

<template>
  <div class="page-publication">
    <LayoutWrapperPage>
      <div v-if="adView" class="page-publication__row">
        <div class="page-publication__title">
          <h1>{{adView.name}}</h1>
        </div>
        <div class="page-publication__date">
          <span>{{formatDate(adView.created_at, 'DD MMMM YYYY, HH:mm')}}</span>
        </div>
        <div v-if="adView" class="page-publication__main" id="page-publication__main">
          <div class="page-publication__main-left">
            <div class="page-publication__gallery">
              <div class="page-publication__gallery-item --main"  ref="cardItemHTML">
                <swiper
                    class="page-publication__gallery-swiper --main"
                    :navigation="true"
                    :grabCursor="true"
                    :thumbs="{ swiper: thumbsSwiper }"
                    :modules="modules"
                    :slidesPerView="1"
                >
                  <swiper-slide
                      class="page-publication__gallery-swiper__slide"
                      v-for="(image, indexImg) in adView.photos"
                      @click="showZoomPhotos(image.url)"
                      :key="indexImg"
                  >
                    <img :src="image.url" :style="getImageStyle(indexImg)" >
                  </swiper-slide>
                </swiper>
              </div>

              <div v-if="adView.photos.length > 1" class="page-publication__gallery-item --addition" ref="cardAdditionItemHTML">
                <swiper
                    class="page-publication__gallery-swiper --addition"
                    @swiper="setThumbsSwiper"
                    slidesPerView="auto"
                    :spaceBetween="4"
                    :freeMode="true"
                    direction="vertical"
                    :mousewheel="true"
                    :watchSlidesProgress="true"
                    :modules="[...modules, Mousewheel]"
                    :breakpoints="{
                      1025: {
                        slidesPerView: 3.9,
                      },
                      770: {
                        spaceBetween: 9,
                        slidesPerView: 3.9,
                      },
                    }"
                >
                  <swiper-slide
                      class="page-publication__gallery-swiper__slide"
                      v-for="(image, index) in adView.photos"
                      :key="index"
                      slide-active-class="--active"
                  >
                    <img :src="image.url">
                  </swiper-slide>
                </swiper>
              </div>
            </div>
            <ClientOnly>
              <Teleport :disabled="!isMobile" to="#page-publication__main">
                <div class="page-publication__details">
                  <AdPageDetails :item="adView" />
                  <div ref="contactsHtmlBlock" class="page-publication__details-contacts">
                    <div class="page-publication__details-contacts__title">
                      <span>Связаться с автором объявления</span>
                    </div>
                    <UserContactMethodsView
                        :contacts="contacts"
                    />
                  </div>
                </div>
              </Teleport>
            </ClientOnly>
          </div>
          <AdPageRight
              class="page-publication__main-right"
              :item="adView"
              @goToContacts="goToContacts"
          />
        </div>
      </div>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-publication {
  width: 100%;
  //display: flex;
  gap: 20px;
  position: relative;

  &__row {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__title {
    @include h1;
    margin-top: 40px;

    @media (max-width: $xs) {
      margin-top: 15px;
    }
  }

  &__main {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-start;
    flex: 1;
    @media (max-width: $sm) {
      flex-direction: column;
      align-items: center;
    }
    &-left {
      flex: 1;
      @media (max-width: $sm) {
        max-width: 600px;
        width: 100%;
      }
    }
    &-right {
      order: 1;
    }
  }
  &__gallery {
    flex-shrink: 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 50px;
    @media (max-width: $sm) {
      /*grid-template-columns: 1fr 1fr;*/
      /*display: grid;*/
      align-items: stretch;
      margin-bottom: 20px;
    }
    @media (max-width: $xs) {
      gap: 7px;
    }

    &-item {
      &.--main {

        width: 500px;
        border-radius: 10px;
        overflow: hidden;
        aspect-ratio: 1;

        @media (max-width: $md) {
          width: 450px;
        }
        @media (max-width: $sm) {
          width: auto;
        }
        .page-publication__gallery-swiper {
          height: 100%;
          &__slide {

            img {
              height: 100%;

              border-radius: 10px;
              box-shadow: $box-shadow-lite;
            }
          }
        }
      }
      &.--addition {



        width: 100px;
        height: 500px;
        @media (max-width: $md) {
          height: 450px;
        }
        @media (max-width: $sm) {
          //grid-column: 2;
          //grid-row: 1;

          //overflow: hidden;

          //flex: 1;

          height: auto;
          aspect-ratio: 1 / 4;

          flex-shrink: 0;

          /*height: auto;
          //flex-shrink: 0;*/
          width: calc(20% - 20px)
          /*max-width: 100px;
          //min-width: 50px;
          //max-height: 450px;
          //min-height: 200px;*/

        }

        .page-publication__gallery-swiper {
          height: 100%;
          width: 100%;
          flex: 0;


          &__slide {

            //width: 500px;
            //height: 400px;
            opacity: 0.6;
            transition: all 0.4s;
            cursor: pointer;
            @media (max-width: $sm) {
              height: 25%;
              margin-bottom: 9px;
              flex: 0 0 auto;
              &:last-child {
                margin-bottom: 0;
              }
            }

            img {
              border-radius: 10px;
              box-shadow: $box-shadow-lite;
              //height: 100%;
              //width: auto;
              height: 100%;
              object-fit: cover;
              object-position: center;
              @media (max-width: $sm) {
                height: 100%;
              }
            }
          }
        }
      }
    }

    @media (max-width: $sm) {
      width: 100%;
      height: auto;

    }
    &-swiper {
      width: 100%;

      &__slide {
        display: flex;
        align-items: center;

        @media (max-width: $sm) {
          width: auto;
        }
        img {
          //height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  &__details {
    @media (max-width: $sm) {
      width: 100%;
      order: 2;
    }
    &-contacts {
      scroll-margin: 50px;
      margin-top: 40px;
      &__title {
        margin-bottom: 20px;
        @include h5;
      }
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
<style lang="scss">
.page-publication__gallery-swiper.--addition {
  .swiper-wrapper {
    @media (max-width: $sm) {
      //display: flex;
      //gap: 9px;
    }
  }
}

.page-publication__gallery-swiper.--addition {
  .page-publication__gallery-swiper__slide.swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>