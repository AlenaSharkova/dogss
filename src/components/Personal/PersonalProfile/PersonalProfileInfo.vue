<script setup lang="ts">

import type {PropType} from "vue";
import type {UserItemFullStruct} from "~/struct/User/UserItemStruct";
import UserContactMethodsSelectItem from "~/components/User/UserContactMethodsSelectItem.vue";
import UserContactMethodsView from "~/components/User/UserContactMethodsView.vue";
import BaseWrapperIconBlur from "~/components/Base/BaseWrapperIconBlur.vue";

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

const contacts = computed(() => props.user.personal_data.contact_methods)
</script>

<template>
  <div class="personal-profile-info">
    <BaseWrapperIconBlur @click="$emit('change')" class="personal-profile-info__change">
      <BaseIconChange class="icon" />
    </BaseWrapperIconBlur>
    <div class="personal-profile-info__wrapper">
      <div class="personal-profile-info__contacts-title">
        <span>Личная информация</span>
      </div>
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
      <div class="personal-profile-info__contacts">
        <div class="personal-profile-info__contacts-title">
          <span>Контактные данные</span>
        </div>
        <UserContactMethodsView
            :contacts="contacts"
        />
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
    .icon {
      width: 20px;
      height: 20px;
      color: $grey;
    }
    &:hover {
      box-shadow: $box-shadow-dark;
    }
  }
  &__wrapper {
    padding: 40px;
    @media (max-width: $sm) {
      padding: 30px 20px;
    }
  }
  &__list {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    flex-direction: column;
    gap: 1px;
    @include blur-block();
    width: auto;

    //min-width: 20%;
    flex: auto;
    &-title {
      @include text-small();
      color: $violet-opacity;
    }
    &-value {
      @include subtitle-small();
      color: $violet;
      text-align: center;
    }
  }
  &__contacts {
    &-title {
      margin-bottom: 10px;
      @include h6;
    }
  }
}
</style>