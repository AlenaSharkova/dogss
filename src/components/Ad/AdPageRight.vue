<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {calculateAge, formatAmountInput, formatDate, getYearsOld} from "~/utils/formatData";
import { Pagination } from 'swiper/modules';
import type Swiper from "swiper";
import BaseIconHeart from "~/components/Base/BaseIcon/BaseIconHeart.vue";
import BaseWithMiniPopup from "~/components/Base/BaseWithMiniPopup.vue";
import BaseIconGeo from "~/components/Base/BaseIcon/BaseIconGeo.vue";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import {computed} from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<AdItemStruct>,
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
const userFullName = computed(() => props.item.ownerDetails? `${props.item.ownerDetails.personal_data.first_name} ${props.item.ownerDetails.personal_data.last_name}`: '')

</script>

<template>
  <div class="publication-right">
    <div class="publication-right__wrapper">
      <div class="publication-right__price">
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
      <div class="publication-right__owner">
        <BaseProfileCircle
            unfull
            size="medium"
            :name="userFullName"
            :img="item.ownerDetails.personal_data.photo" />
        <div class="publication-right__owner-content">
          <p class="publication-right__owner-fullname">{{userFullName}}</p>
          <p class="publication-right__owner-comments">2 отзыва</p>
        </div>
      </div>
      <div class="publication-right__actions">
        <BaseButton text="Связаться"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.publication-right {
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  width: 100%;
  flex: 1;
  &__wrapper {
    width: 100%;
  }
  &__price {
    @include h3;
  }
  &__owner {
    display: flex;
    gap: 10px;
    padding-top: 14px;
    &-fullname {
      @include h4;
    }
    &-comments {
      color: $violet;
      @include text-normal();
    }
  }
  &__actions {
    margin-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

</style>