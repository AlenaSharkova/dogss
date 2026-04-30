<script setup lang="ts">
import type Swiper from "swiper";
import type {UserItemPublicPreviewStruct, UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import {computed} from "vue";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";


const props = defineProps({
  user: {
    type: Object as PropType<UserItemPublicPreviewStruct>,
    default: []
  }
})

const swiperInstance = ref()

const hasBreeder = computed(() => !!props.user.breeder)
const userFullName = computed(() =>
    hasBreeder.value
        ? `${props.user.breeder?.name}`
        : `${props.user.personal_data.first_name} ${props.user.personal_data.last_name}`
)

const photoView = computed(() =>
    //добавить кооридныта
    hasBreeder.value
        ? `${props.user.breeder?.photo_preview.url}`
        : `${props.user.personal_data.photo}`
)


const onSwiper = (swiper: Swiper) => {
  swiperInstance.value = swiper
};
const router = useRouter();

const goToBreeder = () => {
  //router.push(`/breeders/${id}`)
  console.log('hasBreeder.value', hasBreeder.value)
  if(hasBreeder.value) router.push(`/breeders/${props.user.breeder?.id as number}`)
  else router.push(`/user/${props.user.id}`)
}
</script>

<template>
  <div @click="goToBreeder()" class="card-breeder-item">
    <div class="card-breeder-item__wrapper">
      <BaseProfileCircle
          :name="userFullName"
          size="medium"
          unfull
          :img="photoView" />
      <div class="card-breeder-item__content">
        <div class="card-breeder-item__content-wrapper">
          <div class="card-breeder-item__content-name">
            <p>Имя: {{userFullName}}</p>
            <p>Mail: {{user.personal_data.email}}</p>
          </div>
        </div>
      </div>
      <BaseMiniBlock v-if="hasBreeder" text="Питомник" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-breeder-item {
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