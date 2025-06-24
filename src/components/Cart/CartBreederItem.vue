<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {formatAmountInput, formatDate, getYearsOld} from "~/utils/formatData";
import type Swiper from "swiper";
import type {UserItemPublicPreviewStruct, UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import {computed} from "vue";


const props = defineProps({
  user: {
    type: Object as PropType<UserItemPublicPreviewStruct>,
    default: []
  }
})

const swiperInstance = ref()

const userFullName = computed(() => `${props.user.personal_data.first_name} ${props.user.personal_data.last_name}`)


const onSwiper = (swiper: Swiper) => {
  swiperInstance.value = swiper
};
const router = useRouter();

const goToBreeder = (id: number) => {
  //router.push(`/breeders/${id}`)
  router.push(`/user/${id}`)
}
</script>

<template>
  <div @click="goToBreeder(user.id)" class="cart-breeder-item">
    <div class="cart-breeder-item__wrapper">
      <div class="cart-breeder-item__photo">
        <img src="/image/123.jpg">
      </div>
      <div class="cart-breeder-item__content">
        <div class="cart-breeder-item__content-wrapper">
          <div class="cart-breeder-item__content-name">
            <p>Имя: {{userFullName}}</p>
            <p>Mail: {{user.personal_data.email}}</p>
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