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
const countDogs = computed(() => (props.item.number_male || 0) + (props.item.number_female || 0));
</script>

<template>
  <div class="publication-details">
    <div class="publication-details__characteristic">
      <div class="publication-details__characteristic-title">
        <span>Характеристика</span>
      </div>
      <div class="publication-details__characteristic-row">
        <div class="publication-details__characteristic-row__name">
          <span>Порода</span>
        </div>
        <div class="publication-details__characteristic-row__value">
          <span>{{item.breed?.text}}</span>
        </div>
      </div>
      <div class="publication-details__characteristic-row">
        <div class="publication-details__characteristic-row__name">
          <span>Возраст</span>
        </div>
        <div class="publication-details__characteristic-row__value">
          <p v-if="item.approximate_age"> ~ {{approximateAgeText}}</p>
          <p v-else> {{getYearsOld(item.date_birth)}}</p>
        </div>
      </div>
      <div v-if="countDogs === 1" class="publication-details__characteristic-row">
        <div class="publication-details__characteristic-row__name">
          <span>Пол</span>
        </div>
        <div class="publication-details__characteristic-row__value">
          <div v-if="item.number_male">
            <span>Мальчик</span>
          </div>
          <div v-if="item.number_female">
            <span>Девочка</span>
          </div>
        </div>
      </div>
      <div v-if="countDogs > 1" class="publication-details__characteristic-row">
        <div class="publication-details__characteristic-row__name">
          <span>Количество мальчиков</span>
        </div>
        <div class="publication-details__characteristic-row__value">
          <div>
            <span>{{item.number_male}}</span>
          </div>
        </div>
      </div>
      <div v-if="countDogs > 1" class="publication-details__characteristic-row">
        <div class="publication-details__characteristic-row__name">
          <span>Количество девочек</span>
        </div>
        <div class="publication-details__characteristic-row__value">
          <div>
            <span>{{item.number_female}}</span>
          </div>
        </div>
      </div>
      <div class="publication-details__characteristic-row">
        <div class="publication-details__characteristic-row__name">
          <span></span>
        </div>
        <div class="publication-details__characteristic-row__value">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.publication-details {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  &__characteristic {
    display: flex;
    flex-direction: column;
    gap: 8px;
    &-title {
      @include h6;
    }
    &-row {
      height: 100%;
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
    }
  }

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
        :deep(.publication-details-info__city-icon) {
          color: $violet;
        }
      }
      &-icon {
        width: 15px;
      }
    }
  }
}

</style>