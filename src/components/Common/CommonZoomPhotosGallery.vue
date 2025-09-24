<script setup lang="ts">
import {Pagination} from "swiper/modules";

const commonStore = useCommonStore()
const route = useRoute()

const photosList = computed(() => commonStore.zoomPhotosGallery)

const closeModal = () => {
  commonStore.clearZoomPhotosGallery()
}
const indexActiveSlide = computed(() => {
  if(!photosList.value?.active_photo) return 0
  return photosList.value.list.findIndex(item => item === photosList.value.active_photo)
})

watch(() => route.path,
    (newPath) => {
      commonStore.clearZoomPhotosGallery()
    }
)
</script>

<template>
  <div v-if="commonStore.zoomPhotosGallery" class="common-zoom-photo-gallery">
    <div @click="closeModal" class="common-zoom-photo-gallery__close">
      <BaseIconClose color="white"/>
    </div>
    <div class="common-zoom-photo-gallery__mask"></div>
    <swiper class="common-zoom-photo-gallery__swiper"
            :pagination="{
                clickable: false,
                el: '.common-zoom-photo-gallery__swiper-pagination',
              }"
            :modules="[Pagination]"
            :slidesPerView="1"
            :centered-slides="true"
            :initialSlide="indexActiveSlide"
    >
      <swiper-slide
        class="common-zoom-photo-gallery__swiper-slide"
        v-for="(item, index) in photosList.list"
        :key="index"
      >
        <img :src="item">
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
.common-zoom-photo-gallery {
  position: fixed;
  left: 0; right: 0; bottom: 0; top: 0;
  z-index: 12;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 40px;
    cursor: pointer;
    z-index: 12;
  }
  &__mask {
    cursor: pointer;
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(71, 69, 109, 0.6);
    backdrop-filter: blur(10px);
    z-index: 10;
  }
  &__swiper {
    z-index: 11;
    width: 100%;
    height: 100%;
    &-slide {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5%;
      @media (max-width: $sm) {
        padding: 5% 0;
      }
      img {
        //width: 100%;
        //height: auto;
        //aspect-ratio: 1;
        //height: 100%;
        //width: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}
</style>