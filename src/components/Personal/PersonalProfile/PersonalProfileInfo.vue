<script setup lang="ts">

import type {PropType} from "vue";
import type {UserItemFullStruct} from "~/struct/User/UserItemStruct";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemFullStruct>,
    required: true,
  }
})
defineEmits(['change'])


const info = reactive([
    {
      title: "Фамилия Имя",
      value: props.user.personal_data.first_name + ' ' + props.user.personal_data.last_name,
      icon: 'BaseIcon'
    },
    {
      title: "Логин / email",
      value: props.user.personal_data.email,
      icon: 'BaseIcon'
    },
    {
      title: "Регион",
      value: props.user.personal_data.geo_main.region.text,
      icon: 'BaseIcon'
    },
    {
      title: "Город",
      value: props.user.personal_data.geo_main.city.text,
      icon: 'BaseIcon'
    },
])
</script>

<template>
  <div class="personal-profile-info">
    <div @click="$emit('change')" class="personal-profile-info__change">
      <BaseIconChange class="icon" />
    </div>
    <div class="personal-profile-info__wrapper">
      <div class="personal-profile-info__list">
        <div v-for="item in info" :key="item.title" class="personal-profile-info__item">
          <div class="personal-profile-info__item-title">
            {{item.title}}
          </div>
          <div class="personal-profile-info__item-value">
            {{item.value}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-profile-info {
  border-radius: 24px;
  background-color: $light-teal-66;
  position: relative;
  &__change {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;
    width: 35px;
    height: 35px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(6px);
    box-shadow: $box-shadow-middle;
    transition: all 0.3s;
    background-color: rgba(227, 237, 227, 0.6);
    cursor: pointer;
    .icon {
      width: 20px;
      height: 20px;
    }
    &:hover {
      box-shadow: $box-shadow-dark;
    }
  }
  &__wrapper {
    padding: 20px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    gap: 1px;
    &-title {
      @include text-small();
      color: $violet-opacity;
    }
    &-value {
      @include subtitle-small();
      color: $violet;
    }
  }
}
</style>