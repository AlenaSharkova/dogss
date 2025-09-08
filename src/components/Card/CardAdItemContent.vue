<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {calculateAge, formatAmountInput, formatDate, getYearsOld} from "~/utils/formatData";
import { Pagination } from 'swiper/modules';
import type Swiper from "swiper";
import BaseIconHeart from "~/components/Base/BaseIcon/BaseIconHeart.vue";
import BaseWithMiniPopup from "~/components/Base/BaseWithMiniPopup.vue";
import BaseIconGeo from "~/components/Base/BaseIcon/BaseIconGeo.vue";

const props = defineProps({
  item: {
    type: Object as PropType<AdItemStruct>,
    default: []
  }
})
const filterStore = useFilterStore()

const typeAdText = computed(() => {
  return filterStore.typeAdList?.find(type => type.value == props.item.type_ad)?.text || ''
})
const approximateAgeText = computed(() => {
  return filterStore.approximateAgeList?.find(age => age.value == props.item.approximate_age)?.text || ''
})
const textMainRegions = computed(() => `Регион: ${props.item.geo_main.region?.text}`)
</script>

<template>
  <div class="card-item__content">
    <div class="card-item__content-type" :class="item.type_ad">
      <span>{{typeAdText || 'Тип не указан'}}</span>
    </div>
    <div class="card-item__content-row">
      <div class="card-item__content-name">
        <span>{{item.name || 'Имя не указано'}}</span>
      </div>

      <div class="card-item__content-info">
        <p>{{item.breed?.text}}</p>
        <BaseWithMiniPopup :text="textMainRegions" position="left">
          <div class="card-item__content-info__city">
            <BaseIconGeo class="card-item__content-info__city-icon" color="dark"/>
            <span class="card-item__content-info__city-text" >{{item.geo_main.city?.text}}</span>
          </div>


        </BaseWithMiniPopup>
        <div class="card-item__content-address">
          <p v-if="item.approximate_age"> {{approximateAgeText}}</p>
          <p v-if="!item.approximate_age"> Рождение: {{formatDate(item.date_birth, 'DD MMMM YYYY')}}</p>
          <p v-if="!item.approximate_age"> {{getYearsOld(item.date_birth)}}</p>
          <p v-if="!item.approximate_age"> {{calculateAge(item.date_birth)}}</p>
        </div>
      </div>
      <div class="card-item__content-price">
        <span v-if="item.is_contractual_price">
          Договорная цена
        </span>
        <span v-else-if="item.price === 0">
          Бесплатно
        </span>
        <span v-else-if="item.price === null">
          Цена не указана
        </span>
        <span v-else>{{formatAmountInput(item.price)}} ₽</span>
      </div>
      <div class="card-item__content-date">
        <span>Date: {{formatDate(item.created_at, 'DD.MM.YY HH:mm:ss')}}</span>
      </div>
      <div class="card-item__content-owner">
        <span>Мать: {{item.ownerDetails?.personal_data.first_name}} {{item.ownerDetails?.personal_data.last_name}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.card-item__content {
  padding: 12px 0;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  &-type {

    padding: 4px;
    color: white;
    @include text-small;
    width: max-content;
    border-radius: 0 5px 5px 0;
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
  &-row {
    height: 100%;
    padding: 0 12px;
    display: grid;
    grid-template-rows: 2fr 2fr 1fr 1fr 1fr 1fr;
  }
  &-name {
    padding-top: 7px;
    @include h6;
  }
  &-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    @include text-normal(400);
    &__city {
      display: flex;
      align-items: center;
      gap: 8px;
      &:hover {
        color: $violet;
        :deep(.card-item__content-info__city-icon) {
          color: $violet;
        }
      }
      &-icon {
        width: 15px;
      }
    }
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