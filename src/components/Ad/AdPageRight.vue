<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {formatAmountInput, getPluralForm} from "~/utils/formatData";
import BaseWithMiniPopup from "~/components/Base/BaseWithMiniPopup.vue";
import BaseIconGeo from "~/components/Base/BaseIcon/BaseIconGeo.vue";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import {computed} from "vue";
import type { PropType } from 'vue';
import AdFavoriteHeart from "~/components/Ad/AdFavoriteHeart.vue";
import BaseIconShare from "~/components/Base/BaseIcon/BaseIconShare.vue";

const props = defineProps({
  item: {
    type: Object as PropType<AdItemStruct>,
    required: true,
  }
})
const emits = defineEmits(['go-to-contacts'])
const filterStore = useFilterStore()
const router = useRouter()

const typeAdText = computed(() => {
  return filterStore.typeAdList?.find(type => type.value == props.item.type_ad)?.text || ''
})
const approximateAgeText = computed(() => {
  return filterStore.approximateAgeList?.find(age => age.value == props.item.approximate_age)?.text || ''
})
const textMainRegions = computed(() => `Регион: ${props.item.geo_main.region?.text}`)
const userFullName = computed(() => props.item.ownerDetails? `${props.item.ownerDetails.personal_data.first_name} ${props.item.ownerDetails.personal_data.last_name}`: '')
const countAds = computed(() => {
  if(props.item.ownerDetails.ad_list_count) return props.item.ownerDetails.ad_list_count
  else return null
})
const countComments = computed(() => props.item.ownerDetails.comments_count)

const goToOwner = () => {
  router.push(`/user/${props.item?.ownerDetails.id}`)
}
const isShowModalShare = ref(false)
const showModalShare = () => {
  isShowModalShare.value = true
}
const closeModalShare = () => {
  isShowModalShare.value = false
}
const getTextCountProperty = (nameProperty: 'active' | 'archive_success' | 'comments') => {
  switch (nameProperty) {
    case 'active': return countAds.value?.active && `${countAds.value?.archive_success? '+ ': ''}${countAds.value?.active} ${getPluralForm(countAds.value?.active, 'активное объявление', 'активных объявления', 'активных объявлений')}`
    case "archive_success": return countAds.value?.archive_success && `${countAds.value.archive_success} ${getPluralForm(countAds.value.archive_success, 'состоявшаяся сделка', 'состоявшиеся сделки', 'состоявшихся сделок')}`
    case "comments": return countComments.value && `${countComments.value} ${getPluralForm(countComments.value, 'отзыв', 'отзыва', 'отзывов')}`
    default: return ''
  }
}
const goPageUser = (nameBlock: 'publications-active' | 'publications-archive-success' | 'comments') => {
  return `/user/${props.item?.ownerDetails.id}?section-default=${nameBlock}`
}
const goToContacts = () => {
  emits('go-to-contacts')
}
</script>

<template>
  <div class="publication-right">
    <div class="publication-right__row">
      <div class="publication-right__block --info">
        <div class="publication-right__info">
          <div class="publication-right__info-top">
            <AdFavoriteHeart
                class="publication-right__info-top__favorite"
                size="middle"
                :id="item.id"
                :is-favorite="item.isFavorite"
            />
            <div class="publication-right__info-top__price">
              <span v-if="item.is_contractual_price">Договорная цена</span>
              <span v-else-if="item.price === 0">Бесплатно</span>
              <span v-else-if="item.price === null">Цена не указана</span>
              <span v-else>{{formatAmountInput(item.price)}} ₽</span>
            </div>
            <div class="publication-right__info-top__type" :class="item.type_ad">
              <span>{{typeAdText}}</span>
            </div>
          </div>
          <div class="publication-right__info-geo">
            <div class="publication-right__info-geo__place">
              <div class="publication-right__info-geo__place-title">
                <span>Место сделки</span>
              </div>
              <div class="publication-right__info-geo__place-value">
                <BaseWithMiniPopup :text="textMainRegions" position="left">
                  <div class="publication-right__info-geo__place-value__city">
                    <BaseIconGeo class="publication-right__info-geo__place-value__city-icon" color="dark"/>
                    <span class="publication-right__info-geo__place-value__city-text">{{item.geo_main.city.text}}</span>
                  </div>
                </BaseWithMiniPopup>
              </div>
            </div>
            <div v-if="item.exportRegions.isExport" class="publication-right__info-geo__shipping">
              <img class="publication-right__info-geo__shipping-icon" src="@/assets/image/svg/shipping-white.svg" alt="">
              <span>Возможна доставка</span>
              <div class="publication-right__info-geo__shipping-more">
                <span>i</span>
              </div>
            </div>
          </div>
          <div @click="showModalShare" class="publication-right__info-share">
            <span>Поделиться</span>
            <BaseIconShare class="publication-right__info-share__icon" />
          </div>
        </div>
      </div>
      <div class="publication-right__block --owner">
        <div class="publication-right__owner">
          <BaseProfileCircle
              @click="goToOwner"
              class="publication-right__owner-profile"
              unfull
              size="medium"
              :name="userFullName"
              :img="item.ownerDetails.personal_data.photo" />
          <p @click="goToOwner" class="publication-right__owner-fullname">{{userFullName}}</p>
          <div class="publication-right__owner-additions">
            <div class="publication-right__owner-additions__ads">
              <BaseIconCheck class="publication-right__owner-additions__ads-icon" />
              <div v-if="countAds && (countAds.archive_success || countAds.active)" class="publication-right__owner-additions__ads-text">
                <nuxt-link v-if="countAds.archive_success" 
                           :to="goPageUser('publications-archive-success')">
                  {{getTextCountProperty('archive_success')}}
                </nuxt-link>
                <nuxt-link
                    :to="goPageUser('publications-active')"
                    v-if="countAds.active"
                    class="publication-right__owner-additions__ads-text__active">
                  {{getTextCountProperty('active')}}
                </nuxt-link>
              </div>
            </div>
            <div v-if="countComments" class="publication-right__owner-additions__comments">
              <BaseIconCheck class="publication-right__owner-additions__comments-icon" />
              <div class="publication-right__owner-additions__comments-text">
                <nuxt-link
                    :to="goPageUser('comments')"
                    v-if="countComments"
                >{{getTextCountProperty('comments')}}</nuxt-link>
              </div>
            </div>
          </div>

          <BaseButton @click.stop="goToContacts" text="Связаться" />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <CommonShareInContactModal
          :is-show-modal="isShowModalShare"
          @close="closeModalShare"
          :path="`/publication/${item.id}`"
          type-share="ad"
      />
    </Teleport>

  </div>
</template>

<style scoped lang="scss">

.publication-right {
  position: sticky;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: max-content;
  z-index: 10;
  width: 50%;
  max-width: 650px;
  min-width: 450px;
  @media (max-width: $sm) {
    position: static;
    width: 100%;
    max-width: none;
    min-width: auto;
  }
  &__row {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__block {
    border-radius: 25px;
    box-shadow: $box-shadow-lite;
    padding: 24px;
    &.--info {
      background-color: $light-teal;
    }
    &.--owner {
      background-color: $violet;
      color: $white-text;
      transition: all .4s;
      &:hover {
        box-shadow: $box-shadow-dark;
      }
    }
  }
  &__info {
    &-top {
      display: flex;
      align-items: start;
      gap: 10px;
      position: relative;
      padding-right: 55px;
      flex-wrap: wrap;
      @media (max-width: $xs) {
        padding-right: 45px;
      }
      @media (max-width: $xss) {
        flex-direction: column;
        padding-right: 0;
      }
      &__favorite {
        top: 0px;
        right: 20px;
        width: 30px;
        height: 30px;
        position: absolute;
        cursor: pointer;
        @media (max-width: $xs) {
          right: 10px;
        }
      }
      &__price {
        @include h3;
        @media (max-width: $xss) {
          padding-right: 45px;
        }
      }
      &__type {
        padding: 6px 8px;
        color: white;
        @include text-small;
        width: max-content;
        border-radius: 5px;
        background-color: rgba(142, 3, 53, 0.6);
        &.purchase {
          background-color: #035bb399;
        }
        &.good-hands {
          background-color: rgba(82, 3, 179, 0.6);
        }
        &.mating {
          background-color: rgba(3, 179, 6, 0.6);
        }
        &.lost {
          background-color: rgba(179, 129, 3, 0.6);
        }
      }
    }
    &-geo {
      margin-top: 36px;
      display: flex;
      gap: 10px;
      justify-content: space-between;
      align-items: center;
      &__place {
        &-title {
          @include text-small;
          color: $grey;
        }
        &-value {
          margin-top: 6px;
          &__city {
            @include subtitle-small();
            display: flex;
            gap: 5px;
            align-items: center;
            transition: all 0.2s;
            &:hover {
              color: lighten($violet, 10%);
              .publication-right__info-geo__place-value__city-icon {
                color: lighten($violet, 10%);
              }
            }
          }
        }
      }
      &__shipping {
        padding: 6px 8px;
        color: white;
        @include text-small;
        width: max-content;
        border-radius: 5px;
        background-color: rgb(185, 150, 45);
        display: flex;
        gap: 5px;
        align-items: center;
        cursor: pointer;
        position: relative;
        &-icon {
          height: 12px;
        }
        &-more {
          position: absolute;
          top: -5px;
          right: -3px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $grey-lite;
          color: $grey;
          box-shadow: $box-shadow-lite;
          @include text-mini();
        }
      }
    }
    &-share {
      @include text-upper;
      @include text-normal(500);
      margin-top: 30px;
      cursor: pointer;
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      align-items: center;
      transition: all .2s;
      width: min-content;
      margin-left: auto;
      &:hover {
        color: lighten($violet, 10%);
        .publication-right__info-share__icon {
          color: lighten($violet, 10%);
        }
      }
      &__icon {
        width: 22px;
      }
    }
  }
  &__owner {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    padding-top: 14px;
    justify-content: center;
    &-profile {
      cursor: pointer;
    }
    &-fullname {
      @include h4;
      transition: all 0.2s;
      cursor: pointer;
      &:hover {
        color: lighten($light-teal, 10%);
      }
    }
    &-additions {
      display: flex;
      width: 100%;
      align-items: flex-start;
      justify-content: start;
      flex-direction: column;
      gap: 5px;
      margin-top: 20px;
      margin-bottom: 15px;
      &__ads, &__comments {
        color: $light-teal;
        display: flex;
        align-items: center;
        gap: 5px;
        @include text-normal();
        @media (max-width: $xs) {
          justify-content: start;
          align-items: start;
        }
      }
      &__ads {
        &-icon {
          flex-shrink: 0;
        }
        &-text {
          line-height: 140%;
          color: white;
          display: flex;
          gap: 8px;
          @media (max-width: $xs) {
            flex-direction: column;
            gap: 3px;
          }
          &__active {
            color: $light-teal;
          }
        }
      }
      &__comments {
        flex-shrink: 0;
        &-text {
          line-height: 140%;
          color: white;
        }
      }
    }
  }
}

</style>