<script setup lang="ts">

import CardDogsItem from "~/components/Card/CardDogsItem.vue";
import {type PropType, ref} from "vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import type {BreederSiteItemStruct} from "~/struct/Breeder/BreederSiteStruct";
import type {DogShortItemStruct} from "~/struct/Dog/DogItemStruct";
import {Autoplay, EffectCoverflow} from "swiper/modules";
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";

const props = defineProps({
  dogs: {
    type: Object as PropType<DogShortItemStruct[] | null>,
    default: null
  },
  typeAction: {
    type: String as PropType<'view' | 'create' | 'change'>,
    default: 'view'
  },
})
const imageList = defineModel<ICommonUpload[]>({default: []});

const isShowUploadModal = ref(false)
const showUploadModal = () => {
  isShowUploadModal.value = true
}
const closeUploadModal = () => {
  isShowUploadModal.value = false
}
</script>

<template>
  <div class="breeder-site__gallery">
    <swiper
        class="breeder-site__gallery-swiper"
        :effect="'coverflow'"
        :grabCursor="true"
        :loopPreventsSliding="true"
        :loop="true"
        :loopedSlides ="3"
        :loopAdditionalSlides ="true"
        :centered-slides="true"
        :speed="1300"
        :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
        :modules="[EffectCoverflow, Autoplay]"
        :slidesPerView="1.5"
        :coverflowEffect='{
              "rotate": 50,
              "stretch": 0,
              "depth": 100,
              "modifier": 1,
              "slideShadows": true
            }'
        :breakpoints='{
              768: {
                slidesPerView: "auto"
              }
            }'
    >
      <swiper-slide
          class="breeder-site__gallery-swiper__slide"
          v-for="(itemImg, index) in imageList"
      >
        <img :src="itemImg.imageUrl">
        <!--<img :src="`/server/image/users/1/${i}.jpg`">-->
      </swiper-slide>
    </swiper>
    <div class="breeder-site__gallery-manage">
      <BaseButton
          class="breeder-site__gallery-manage__button"
          text="Перейти к добавлению фото"
          type="teriary"
          @click="showUploadModal"
      />
      <CommonUploadImageModal
          :isShow="isShowUploadModal"
          titleModal="Загрузите фото для галереи"
          :limit="15"
          text-next-btn="Перейти к странице"
          v-model="imageList"
          @close="closeUploadModal"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.breeder-site__gallery {
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

</style>

<style lang="scss">

.breeder-site__gallery-swiper {
  .swiper-wrapper {
    align-items: center;
  }
}
</style>