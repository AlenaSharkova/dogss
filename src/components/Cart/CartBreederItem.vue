<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {formatAmountInput, formatDate, getYearsOld} from "~/utils/formatData";
import type Swiper from "swiper";


defineProps({
  item: {
    type: Object as PropType<AdItemStruct>,
    default: []
  }
})

const swiperInstance = ref()

const onSwiper = (swiper: Swiper) => {
  swiperInstance.value = swiper
};
const router = useRouter();

const goToBreeder = (id: number) => {
  router.push(`/breeders/${id}`)
}
</script>

<template>
  <div @click="goToBreeder(item.id)" v-if="item" class="cart-breeder-item">
    <div class="cart-breeder-item__wrapper">
      <div class="cart-breeder-item__photo">
        <img src="/image/123.jpg">
      </div>
      <div class="cart-breeder-item__content">
        <div class="cart-breeder-item__content-wrapper">
          <div class="cart-breeder-item__content-name">
            <p>Имя: {{item.name}}</p>
            <p>Mail: {{item.email}}</p>
            <p>Цена: {{formatAmountInput(item.price)}} ₽</p>
            <p> Рождение: {{formatDate(item.date, 'DD MMMM YYYY')}}</p>
            <p> Возраст: {{getYearsOld(item.date)}}</p>
            <p> Мать: {{item.ownerDetails?.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-breeder-item {
  cursor: pointer;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex: 1;
  background: #fff;
  position: relative;
  //height: 100%;
  transition: all 0.2s ease-out;
  box-shadow: 0px 4px 24px 0px rgba(30, 30, 30, 0.1);

  &:hover {
    //box-shadow: 0px 4px 24px 0px rgba(30, 30, 30, 0.25);
    //box-shadow: -7px 11px 16px 10px rgb(227 72 72 / 8%);
    box-shadow: 0px 4px 24px 10px rgb(30, 30, 30, 0.24);

  }

  &__wrapper {
    padding: 24px;
    display: flex;
    gap: 20px;
    align-items: center;
    width: 100%;
  }
  &__photo {
    width: 150px;
    height: 150px;
    img {
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
  }
  &__content {
  }
}

</style>