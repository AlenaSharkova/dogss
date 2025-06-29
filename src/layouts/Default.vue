<script setup lang="ts">
import LayoutHeaderNav from '@/components/Layout/LayoutHeaderNav.vue'
import { ref} from 'vue'
import CommonAlertsList from "~/components/Common/CommonAlertsList.vue";

const route = useRoute()

const isShowMenu = ref(false)

const breedsStore = useBreedsStore()
const commonStore = useCommonStore()


const isPersonalMenu = computed(() => route.path.startsWith('/personal') || route.query.type === 'personal')
</script>

<template>
  <div class="default-layout">
    <CommonLoading />
    <header class="header" :class="{'header--hidden': commonStore?.isScrolled}">
      <div class="header-wrapper">
        <nuxt-link to="/" class="header-logo">
          <img src="@/assets/image/svg/paw.svg">
        </nuxt-link>
        <div class="header-menu">
            <LayoutHeaderNav @close="isShowMenu=false" />
        </div>
      </div>
    </header>
    <div class="main">

      <div class="main-container">
        <slot></slot>
        <NuxtLoadingIndicator color="#47456D" :height="5" :throttle="3" />

      </div>
      <CommonUpButton />
      <CommonAlertsList/>
      <PersonalMenu v-if="isPersonalMenu" />
    </div>
  </div>
</template>

<style scoped lang="scss">

.default-layout {
  min-height: 100vh;
  background-color: $back;

  .header {
    width: 100vw;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    height: 92px;
    //background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 70%, rgba(255,255,255, 0) 100%);
    background: linear-gradient(180deg, rgb(178, 225, 218), 0%, rgba(178, 225, 218, 1) 30%, rgba(178, 225, 218, 0.95) 60%,rgba(178, 225, 218, 0.85) 70%, rgba(178, 225, 218, 0.6) 82%, rgba(178, 225, 218, 0) 100%);
    z-index: 11;
    transition: all 0.5s;
    will-change: top;


    &--hidden {
      top: -67px;
    }
    @media (max-width: $sm) {
     // display: none;
    }
    &-wrapper {
      height: 100%;
      margin: auto;
      max-width: 1920px;
      padding: 0 55px 0 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      @media (max-width: $md) {
        padding: 0 35px 0 30px;
        gap: 10px;
      }
      @media (max-width: $sm) {
        padding: 0 20px;
        gap: 16px;
      }
    }
    &-logo {
      height: 40px;
      img {
        height: 100%;
      }
    }
    &-menu {
      position: relative;
      width: 100%;
      &__button {
        width: 36px;
        height: 36px;
        cursor: pointer;
      }
    }
  }
  .menu-mobile {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    @media (max-width: $sm) {
      z-index: 13;
    }
  }
  .main {
    //background: rgb(178, 225, 218);
    min-height: 100vh;

    &-container {
      min-height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      max-width: 1920px;
      padding: 30px 0 0;
    }
  }
}

</style>