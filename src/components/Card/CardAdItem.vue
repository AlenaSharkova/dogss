<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import { Pagination } from 'swiper/modules';
import type Swiper from "swiper";
import type {PropType} from "vue";
import BaseIconHeart from "~/components/Base/BaseIcon/BaseIconHeart.vue";
import BaseWithMiniPopup from "~/components/Base/BaseWithMiniPopup.vue";
import CardAdItemContent from "~/components/Card/CardAdItemContent.vue";
import items from "ajv/lib/vocabularies/applicator/items";
import {usePersonalAdStore} from "~/stores/personal-ad.store";
import AdFavoriteHeart from "~/components/Ad/AdFavoriteHeart.vue";

const props = defineProps({
  item: {
    type: Object as PropType<AdItemStruct>,
    default: []
  },
  type: {
    type: String as PropType<'personal' | 'default'>,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const personalStore = usePersonalStore()
const personalAdStore = usePersonalAdStore()
const router = useRouter()

const swiperInstance = ref()
const isLoadDelete = ref(false)
const isShowMore = ref(false)

const onSwiper = (swiper: Swiper) => {
  swiperInstance.value = swiper
};

const goToSlide = (index: number) => {
  swiperInstance.value.slideTo(index-1, 200)
}
const removeFromDraft = async () => {
  isLoadDelete.value = true
  await personalAdStore.deletePersonalAd('draft', props.item.id)
  isLoadDelete.value = false
}
const toEditAdAPage = () => {
  router.push(`/personal/publications/change/${props.item.id}?type=active`)
}
const toggleMorePersonal = () => {
  isShowMore.value = !isShowMore.value
}

const textRegionsExport = computed(() => {
  if(!props.item.exportRegions.isExport) return ''
  return `<p style="font-size: 12px">Возможна доставка в такие регионы, как:</p>
    ${props.item.exportRegions.regionsList?.map(region => region?.text).join('<br>')}`
})
const isActive = computed(() => props.item.status === 'active')
const countDogs = computed(() => (props.item.number_male || 0) + (props.item.number_female || 0));
const malePercentage = computed(() => ((props.item.number_male || 0) / countDogs.value) * 100)

</script>

<template>
  <div
      class="card-item"
      :class="{disabled: isLoadDelete }"
      @click="router.push(`/catalog/${item.id}`)"
  >
    <div class="card-item__wrapper">
      <div class="card-item__top">
        <div class="card-item__info">
          <div class="card-item__info-circle --left"
               :class="[
                   {litter: countDogs > 1},
                   {male: item.number_male},
                   {female: item.number_female},
               ]"
               :style="{
                  '--male-percentage': `${malePercentage - 20}%`,
                  '--female-percentage': `${malePercentage + 20}%`
               }"
          >
            <div class="card-item__info-circle__image">
              <img v-if="countDogs > 1" src="@/assets/image/svg/paws-white.svg" alt="">
              <img v-else-if="item.number_male" src="@/assets/image/svg/dog-boy-white.svg" alt="">
              <img v-else-if="item.number_female" src="@/assets/image/svg/dog-girl-white2.svg" alt="">
            </div>
          </div>
          <BaseWithMiniPopup
              v-if="item.exportRegions.isExport"
              :text="textRegionsExport"
              class="card-item__info-circle --right --export">
            <div class="card-item__info-circle__image">
              <img src="@/assets/image/svg/shipping-white.svg" alt="">
            </div>
          </BaseWithMiniPopup>
          <div v-if="type == 'personal' && isActive"
               @click="toggleMorePersonal"
               class="card-item__info-circle --top-right">
            <div class="card-item__info-circle__content" >
              <div class="card-item__info-circle__content-more">
                <div v-for="i in 3" class="card-item__info-circle__content-more__point"></div>
              </div>
            </div>
            <Transition name="fade">
              <CardAdItemMore
                  :id="item.id"
                  v-if="isShowMore"
                  @toEditAdPage="toEditAdAPage()"
                  @toArchiveAd="" />
            </Transition>
          </div>
          <AdFavoriteHeart
              v-else-if="isActive"
              class="card-item__info-circle --top-right"
              :id="item.id"
              :is-favorite="item.isFavorite"
          />
          <div v-else-if="item.status === 'draft'"
               class="card-item__info-circle --top-right"
               @click.stop="removeFromDraft"
          >
            <div class="card-item__info-circle__content">
              <div class="card-item__info-circle__content-icon">
                <BaseIconClose color="error" />
              </div>
            </div>
          </div>
        </div>
        <swiper :space-between="0"
                class="card-item__swiper"
                :pagination="{
                clickable: false,
                el: '.card-item__swiper-pagination',
              }"
                @swiper="onSwiper"
                :modules="[Pagination]"
        >
          {{`${item.photos}1.jpg`}}
          <swiper-slide
              class="card-item__swiper-slide"
              v-for="(img, indexImg) in item.photos"
              :key="indexImg"
          >
            <img class="card-item__swiper-img" :src="img" :alt="`dog-${item.id}-${indexImg}`">
          </swiper-slide>
          <div v-if="!item.photos.length"
               class="card-item__swiper-slide --empty">
            <img class="card-item__swiper-img" src="@/assets/image/default_card.png" loading="lazy" :alt="`dog-${item.id}-${item.indexImg}`">
          </div>

          <div class="card-item__swiper-pagination"></div>
          <div v-if="swiperInstance" class="card-item__swiper-announcements">
            <div class="card-item__swiper-announcements__item"
                 v-for="indexSlide in swiperInstance?.slides?.length"
                 @mouseover="goToSlide(indexSlide)"
                 @touchmove="goToSlide(indexSlide)"
            ></div>
          </div>
        </swiper>
      </div>

      <CardAdItemContent :item="item"/>
    </div>

  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
:root {
  --male-percentage: 50%; /* Пример значения.  Замените на нужное вам значение. */
}
.card-item {
  //width: 300px;
  //height: 600px;
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  display: flex;
  flex: 1;
  background: #fff;
  position: relative;
  //height: 100%;
  transition: all 0.2s ease-out;
  box-shadow: $box-shadow-lite;
  &.disabled {
    opacity: 0.6;
    pointer-events: none;
    filter: blur(3px);
  }
  &:hover {
    //box-shadow: 0px 4px 24px 0px rgba(30, 30, 30, 0.25);
    //box-shadow: -7px 11px 16px 10px rgb(227 72 72 / 8%);
    box-shadow: $box-shadow-middle-wide;

  }
  &__wrapper {
    width: 100%;
  }
  &__top {
    position: relative;
  }
  &__info {
    &-circle {
      position: absolute;
      left: 0;
      z-index: 2;
      width: 50px;
      height: 50px;
      border-radius: 0 10px 10px 0;
      background-color: rgba(144, 238, 144, 0.6);
      backdrop-filter: blur(6px);
      box-shadow: $box-shadow-middle;
      bottom: 10px;
      transition: all 0.3s;
      &:hover {
        box-shadow: $box-shadow-dark;
      }
      &.--hidden {
        pointer-events: none;
        opacity: 0.6;
        &:hover {
          box-shadow: $box-shadow-middle;
        }
      }
      &.--top-right {
        border-radius: 10px;
        right: 5px;
        left: auto;
        top: 5px;
        bottom: auto;
        background-color: rgba(227, 237, 227, 0.6);
        width: 35px;
        height: 35px;
        cursor: pointer;
      }
      &.--right {
        right: 0;

        left: auto;
        border-radius: 10px 0 0 10px;
        &.--export {
          background-color: #ffd89499;
          //background-color: rgba(245, 245, 220, 0.6);
        }
      }

      &.male {
        background-color: rgba(74, 178, 234, 0.6);
       // background-color: rgba(74, 178, 234, 0.6);
      }
      &.female {
        background-color: rgba(239, 95, 205, 0.6);
      }
      &.litter {
        background: linear-gradient(
          50deg,
          rgba(74, 178, 234, 0.6) var(--male-percentage), /* Синий цвет заканчивается немного раньше */
          rgba(239, 95, 205, 0.6) var(--female-percentage), /* Розовый начинается */
        );
      }

      &__image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        img {
          width: 43px;
          height: auto;
        }
      }
      &__content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        &-icon {
          width: 20px;
          height: 20px;
        }
        &-more {
          display: flex;
          gap: 2px;
          &__point {
            width: 5px;
            height: 5px;
            background-color: $violet;
            border-radius: 50%;
          }

        }
      }
    }
  }

  &__swiper {
    height: 100%;


    z-index: 0;

    &-slide {
      width: 100%;
      height: 100%;
      &.--empty {
        //background-color: $light-teal;
        background: linear-gradient(270deg,$light-teal 0%, $violet-opacity 100%, $light-teal 100%);
      }
      img {
        aspect-ratio: 1;
        //height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    &-pagination {
      position: absolute;
      bottom: 0;
      z-index: 2;
      display: flex;
    }
    &-announcements {
      cursor: pointer;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      display: flex;
      z-index: 10;
      &__item {
        flex: 1;
        height: 100%;
      }
    }
  }
}

</style>