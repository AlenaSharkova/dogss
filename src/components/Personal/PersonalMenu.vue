<script setup lang="ts">
const sections = computed(() => [
    {
      link: 'profile',
      title: 'Профиль',
      count: 0
    },
    {
      link: 'favorites',
      title: 'Мои избранные',
      count: 0
    },
    {
      link: 'ads',
      title: 'Объявления',
      count: 0
    },
    {
      link: 'page',
      title: 'Страница пользователя',
      count: 0
    },
])

const isHiddenMenu = ref(false)
</script>

<template>
  <div class="personal-menu">
    <div @click="isHiddenMenu = !isHiddenMenu" class="personal-menu__arrow">
      <BaseIconArrow color="white" nav="left" />
    </div>
    <div class="personal-menu__block" :class="{'--hidden': isHiddenMenu}">
      <div class="personal-menu__nav">
        <router-link
            v-for="item in sections"
            :key="item.link"
            active-class="--active"
            class="personal-menu__nav-item"
            :to="`/personal/${item.link}`">
          <div class="personal-menu__nav-item__row">
            <div class="personal-menu__nav-item__icon">
              <BaseIconHeart hover />
            </div>
            <p class="personal-menu__nav-item__text">{{ item.title }}</p>

          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .personal-menu {
    position: fixed;
    top: 200px;
    left: 0;
    z-index: 2;

    &__arrow {
      position: absolute;
      bottom: 100%;
      padding: 10px;
      left: 0;
      box-shadow: $box-shadow-middle;
      background-color: $violet-opacity;
      border-radius: 0 20px 20px 0;
      cursor: pointer;
      backdrop-filter: blur(20px);

    }
    &__block {
      border-radius: 0 20px 20px  0;
      box-shadow: $box-shadow-middle;
      backdrop-filter: blur(20px);
      background-color: $violet-opacity;
      z-index: 2;
      transition: all 0.4s;

      //background-color: #22222222;
      width: 250px;
      height: 250px;
      overflow: hidden;

      width: 60px;
      padding: 10px 5px;

      //height: 20px;
      &:hover {
        padding: 10px;

        width: 250px;
        height: 250px;

        //height: 250px;
      }
      &.--hidden {
        width: 0;
        padding: 10px;
        //height: 20px;
        border-radius: 0 0 20px  0;


      }

    }
    &__nav {

      display: flex;
      flex-direction: column;
      gap: 5px;
      &-item {
        overflow: hidden;

        padding: 10px 15px;
        border-radius: 10px;
        transition: all 0.2s;
        color: $white-text;
        &:hover {
          background-color: #B2E1DABB;
          color: $violet;
        }
        &.--active {
          background-color: $light-teal;
          color: $violet;
        }
        &__row {
          overflow: hidden;
          gap: 10px;
          display: flex;
          align-items: center;
        }
        &__text {
          text-wrap: nowrap;
          @include h6;
        }

      }
    }
  }
</style>