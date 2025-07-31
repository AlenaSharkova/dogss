<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import {useAdStore} from "~/stores/ad.store";
import { FreeMode, Navigation, Thumbs, Mousewheel} from 'swiper/modules';
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";

definePageMeta({
  requirementUser : null
})
const route = useRoute();
const idPublication = ref<string | null>(null)

const usersStore = useUsersStore()
const adStore = useAdStore()

idPublication.value = route.params.id as string

await adStore.getViewAd({id: idPublication.value})


onUnmounted(() => {
  usersStore.userViewData = null
})
onMounted(() => {


})
const adView = computed(() => adStore.adView )

//const adStore = useAdStore()
//adStore.updateAdList()

const updateList = () => {
  adStore.updateAdList()
}

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
const modules = ref([FreeMode, Navigation, Thumbs])

</script>

<template>
  <div class="page-publication">
    <LayoutWrapperPage>

      <div class="page-publication__row">
        {{adView}}
        <div class="page-publication__title">
          <h1>{{adView?.name}}</h1>
        </div>
        <div class="page-publication__main">
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
          {{usersData}}
          <AdPageRight v-if="adView" :item="adView" />
        </div>
        <AdPageDetails v-if="adView" :item="adView" />

      </div>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-publication {
  //display: flex;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &__row {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__main {
    display: flex;
    gap: 20px;
  }

  &__title {
    padding: 0 50px;
    @include h1;
    margin-top: 40px;

    @media (max-width: $xs) {
      padding: 0 20px;
      margin-top: 15px;
    }
  }
  &__gallery {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 100px;
    &-item {
      &.--main {
        width: 500px;
      }
      &.--addition {
        width: 100px;
        height: 500px;
        .page-publication__gallery-swiper {
          height: 100%;

          &__slide {
            //width: 500px;
            //height: 400px;
            opacity: 0.6;
            transition: all 0.4s;
            cursor: pointer;

            img {

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