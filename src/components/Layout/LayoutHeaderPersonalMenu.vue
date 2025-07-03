<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";

const authStore = useAuthStore()
const router = useRouter();

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
    link: '/personal/ads',
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
])
const logout = async () => {
  await authStore.logout()
  await router.push("/")
  //goToPage('/dashboard/authorization')
}

</script>

<template>
  <div class="header-personal-menu">
    <div class="header-personal-menu__wrapper">
      <div class="header-personal-menu__list">
        <router-link
            v-for="item in sections"
            :key="item.link"
            active-class="--active"
            class="header-personal-menu__item"
            :to="item.link">
          <div class="header-personal-menu__item-row">
            <component class="header-personal-menu__item-icon" :is="`BaseIcon${item.icon}`" />
            <p class="header-personal-menu__item-text">{{ item.title }}</p>

          </div>
        </router-link>
        <div @click="logout" class="header-personal-menu__item --logout">
          <p class="header-personal-menu__item-text">Выйти</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.header-personal-menu {
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 20px 20px;
  box-shadow: $box-shadow-middle;
  backdrop-filter: blur(20px);
  background-color: $violet-opacity;
  z-index: 2;
  transition: all 0.4s;
  overflow: hidden;
  padding: 10px 5px;
  @media (max-width: $sm) {
    position: static;
    background-color: transparent;
    backdrop-filter: blur(0px);
    box-shadow: none;

  }
  &__wrapper {
    padding: 10px;
    @media (max-width: $sm) {
      padding-bottom: 70vh;

    }

  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__item {
    overflow: hidden;
    cursor: pointer;
    padding: 10px 8px;
    border-radius: 10px;
    transition: all 0.2s;
    color: $white-text;
    display: flex;

    &.--logout {
      color: $error;

      &:hover {
        background-color: $error;
      }

    }
    &:hover {
      background-color: #B2E1DABB;
      color: $violet;
      .header-personal-menu__item-icon {
        color: $violet;
      }
    }
    &.--active {
      background-color: $light-teal;
      color: $violet;
      .header-personal-menu__item-icon {
        color: $violet;
      }
    }
    &-row {
      overflow: hidden;
      gap: 10px;
      display: flex;
      align-items: center;
    }
    &-icon {
      flex-shrink: 0;
      color: $white-text;
    }
    &-text {
      text-wrap: nowrap;
      @include h6;
    }

  }
}
</style>