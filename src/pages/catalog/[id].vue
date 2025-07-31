<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import {useAdStore} from "~/stores/ad.store";
import { FreeMode, Navigation, Thumbs, Mousewheel} from 'swiper/modules';
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
import useScreen from "~/utils/useScreen";
import UserContactMethodsView from "~/components/User/UserContactMethodsView.vue";

definePageMeta({
  requirementUser : null
})
const route = useRoute();

const usersStore = useUsersStore()
const { isMobile } = useScreen();
const adStore = useAdStore()
const authStore = useAuthStore()

const idPublication = ref<string | null>(null)
idPublication.value = route.params.id as string
const modules = ref([FreeMode, Navigation, Thumbs])
const thumbsSwiper = ref(null);

const statusUser = computed(() => authStore.statusUser)
const adView = computed(() => adStore.adView )
const contacts = computed(() => adView.value?.ownerDetails.personal_data.contact_methods)

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

await adStore.requestViewAd( idPublication.value)

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
          <h1>{{formatDate(adView.created_at, 'DD MMMM YYYY, HH:mm')}}</h1>
        </div>
        <div v-if="adView" class="page-publication__main" id="page-publication__main">
          <div class="page-publication__main-left">
            <div class="page-publication__gallery">
              <div class="page-publication__gallery-item --main">
                <swiper
                    class="page-publication__gallery-swiper --main"
                    :navigation="true"
                    :grabCursor="true"
                    :thumbs="{ swiper: thumbsSwiper }"
                    :modules="modules"
                    :slidesPerView="1"
                    :breakpoints='{
                    768: {
                      slidesPerView: "auto"
                    }
                  }'
                >
                  <swiper-slide
                      class="page-publication__gallery-swiper__slide"
                      v-for="(image, index) in adView.photos"
                      :key="index"
                  >
                    <img :src="image">
                  </swiper-slide>
                </swiper>
              </div>

              <div v-if="adView.photos.length > 1" class="page-publication__gallery-item --addition">
                <swiper
                    class="page-publication__gallery-swiper --addition"
                    @swiper="setThumbsSwiper"
                    :spaceBetween="10"
                    :slidesPerView="3.9"
                    :freeMode="true"
                    direction="vertical"
                    :mousewheel="true"
                    :watchSlidesProgress="true"
                    :modules="[...modules, Mousewheel]"
                >
                  <swiper-slide
                      class="page-publication__gallery-swiper__slide"
                      v-for="(image, index) in adView.photos"
                      :key="index"
                      slide-active-class="--active"
                  >
                    <img :src="image">
                  </swiper-slide>
                </swiper>
              </div>
            </div>
            <ClientOnly>
              <Teleport :disabled="!isMobile" to="#page-publication__main">
                <div class="page-publication__details">
                  <AdPageDetails :item="adView" />
                  <UserContactMethodsView
                      :contacts="contacts"
                  />
                </div>
              </Teleport>
            </ClientOnly>
          </div>
          <AdPageRight class="page-publication__main-right" :item="adView" />
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
    }
    &-left {
      flex: 1;
      @media (max-width: $sm) {
        width: 100%;
      }
    }
    &-right {
      order: 1;
    }
  }


  &__gallery {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 70px;
    @media (max-width: $sm) {
      justify-content: center;
      margin-bottom: 50px;
    }

    &-item {
      &.--main {
        width: 500px;
        border-radius: 10px;
        overflow: hidden;
        @media (max-width: $md) {
          width: 450px;
        }
        @media (max-width: $sm) {
          max-width: 450px;
          width: auto;
        }

        .page-publication__gallery-swiper {

          &__slide {
            img {
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
          height: auto;
        }

        .page-publication__gallery-swiper {
          height: 100%;

          &__slide {
            //width: 500px;
            //height: 400px;
            opacity: 0.6;
            transition: all 0.4s;
            cursor: pointer;

            img {
              border-radius: 10px;
              box-shadow: $box-shadow-lite;
              aspect-ratio: 1;
              //height: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
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
        @media (max-width: $xs) {
          width: auto;
        }
        img {
          aspect-ratio: 1;
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
    order: 2;
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
  .page-publication__gallery-swiper__slide.swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>