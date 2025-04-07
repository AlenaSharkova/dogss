<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {formatAmountInput, formatDate, getYearsOld} from "~/utils/formatData";
import { Pagination } from 'swiper/modules';
import type Swiper from "swiper";
import BaseIconHeart from "~/components/Base/BaseIcon/BaseIconHeart.vue";
import BaseWithMiniPopup from "~/components/Base/BaseWithMiniPopup.vue";

const props = defineProps({
  item: {
    type: Object as PropType<AdItemStruct>,
    default: []
  }
})
const filterStore = useFilterStore()

const typeAd = computed(() => {
  return filterStore.typeAdList?.find(type => type.value == props.item.type_ad)?.text || ''
})
</script>

<template>
  <div class="cart-item__content">
      <div class="cart-item__content-type" :class="item.type_ad">
        <span>{{typeAd}}</span>
      </div>
    <div class="cart-item__content-row">
      <div class="cart-item__content-name">
        <span>{{item.name}}</span>
      </div>

      <div class="cart-item__content-55">
        <p>{{item.breed.text}}</p>
        <p>{{item.geo_main.region.text}} / {{item.geo_main.city.text}}</p>
        <!--<p> Рождение: {{formatDate(item.date_birth, 'DD MMMM YYYY')}}</p>-->
        <p> {{getYearsOld(item.date_birth)}}</p>
      </div>
      <div class="cart-item__content-price">
        <span>{{formatAmountInput(item.price)}} ₽</span>
      </div>
      <div class="cart-item__content-owner">
        <span>Мать: {{item.ownerDetails?.name}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.cart-item__content {
  padding: 12px 0;
  &-type {
    padding: 4px;
    color: white;
    @include text-small;
    width: max-content;
    border-radius: 0 5px 5px 0;
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
  &-row {
    padding: 0 12px;
  }
  &-name {
    padding-top: 7px;
    @include h6;
  }
  &-price {
    padding-top: 7px;
    @include h6;
  }
  &-owner {
    padding-top: 4px;
    @include text-normal;
  }
}

</style>