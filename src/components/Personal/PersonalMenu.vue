<script setup lang="ts">

const authStore = useAuthStore()
const sections = computed(() => [
    {
      link: '/personal/profile',
      icon: 'User',
      title: 'Профиль',
      count: 0
    },
    {
      link: '/personal/favorites',
      icon: 'Heart',
      title: 'Мои избранные',
      count: 0
    },
    {
      link: '/personal/publications',
      icon: 'Ad',
      title: 'Объявления',
      count: 0
    },
    {
      link: `/user/${authStore.userFullData?.id}?type=personal`,
      icon: 'User',
      title: 'Страница пользователя',
      count: 0
    },
    {
      link: `/admin/publications`,
      icon: 'User',
      title: '/admin/publicationss',
      count: 0
    },
])

const isHiddenMenu = ref(false)
</script>

<template>
  <div class="personal-menu">
    <div @click="isHiddenMenu = !isHiddenMenu" class="personal-menu__arrow">
      <BaseIconArrow color="white" :nav="isHiddenMenu? 'right': 'left'"  />
    </div>
    <div class="personal-menu__block" :class="{'--hidden': isHiddenMenu}">
      <div class="personal-menu__nav">
        <router-link
            v-for="item in sections"
            :key="item.link"
            active-class="--active"
            class="personal-menu__nav-item"
            :to="item.link">
          <div class="personal-menu__nav-item__row">
            <component class="personal-menu__nav-item__icon" :is="`BaseIcon${item.icon}`" />
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
    top: 130px;
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
      height: 250px;
      overflow: hidden;
      width: 49px;
      padding: 10px 5px;

      &:hover {
        padding: 10px;

        width: 250px;
        height: 250px;
        color: $violet;
        //height: 250px;
        .personal-menu__nav-item {
          padding: 10px 15px;
        }
      }
      &.--hidden {
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 0px;
        width: 0px;
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

        padding: 10px 8px;
        border-radius: 10px;
        transition: all 0.2s;
        color: $white-text;
        &:hover {
          background-color: #B2E1DABB;
          color: $violet;
          .personal-menu__nav-item__icon {
            color: $violet;
          }
        }
        &.--active {
          background-color: $light-teal;
          color: $violet;
          .personal-menu__nav-item__icon {
            color: $violet;
          }
        }
        &__row {
          overflow: hidden;
          gap: 10px;
          display: flex;
          align-items: center;
        }
        &__icon {
          flex-shrink: 0;
          color: $white-text;
        }
        &__text {
          text-wrap: nowrap;
          @include h6;
        }

      }
    }
  }
</style>