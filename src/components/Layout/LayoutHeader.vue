<script setup lang="ts">
import {computed, defineEmits} from "vue";
import {useAuthStore} from "~/stores/auth.store";
import BaseInfoCount from "~/components/Base/BaseInfoCount.vue";
import LayoutHeaderNav from "~/components/Layout/LayoutHeaderNav.vue";
import LayoutHeaderPersonalMenu from "~/components/Layout/LayoutHeaderPersonalMenu.vue";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import useScreen from "~/utils/useScreen";

const emit = defineEmits(["close"]);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore()
const personalStore = usePersonalStore()
const commonStore = useCommonStore()
const { isMobile } = useScreen();

const goToPage = (page: string) => {
  //router.push(page)
  //emit('close')
}

const logout = async () => {
  await authStore.logout()
  await router.push("/")
  //goToPage('/dashboard/authorization')
}

const getUserFullData = () => {
  authStore.getUserFullData()
}
const userFullData = computed(() => authStore.userFullData )
const favoritesAdsCount = computed(() => personalStore.FavoritesList?.length || 0 )

onMounted( () => {
  if (authStore.statusUser === 'unknown') {
    //authStore.getUserFullData()
  }
})

const userFullName = computed(() => userFullData.value? `${userFullData.value?.personal_data.first_name} ${userFullData.value?.personal_data.last_name}`: '')

const isShowPersonalMenu = ref(false)
const isShowMobileMenu = ref(false)

const togglePersonalMenu = () => {
  if(isShowMobileMenu.value) {
    isShowMobileMenu.value = false
  }
  isShowPersonalMenu.value = !isShowPersonalMenu.value
}
const toggleMobileMenu = () => {
  if(isShowPersonalMenu.value) {
    isShowPersonalMenu.value = false
  }
  isShowMobileMenu.value = !isShowMobileMenu.value
}

watch(() => route.path,
    (newPath) => {
      isShowMobileMenu.value = false
      isShowPersonalMenu.value = false
    }
)
const isPointedMenu = ref(commonStore?.isScrolled)
const showPointedMenu = () => {
  isPointedMenu.value = true
}
const hiddenPointedMenu = () => {
  isPointedMenu.value = false
}
const isShowMobile = computed(() => (isShowMobileMenu.value || isShowPersonalMenu.value) && isMobile.value)
</script>

<template>
  <header
      @mouseover="showPointedMenu"
      @mouseout="hiddenPointedMenu"
      class="header"
      :class="{'header--hidden': commonStore?.isScrolled && !isPointedMenu && !isShowMobile, '--violet-gradient': isShowPersonalMenu && isMobile}">
    <div class="header-wrapper">
      <nuxt-link to="/" class="header-logo">
        <BaseIconLogo />

      </nuxt-link>
      <Transition name="slide-dropdown">
        <div v-if="isShowMobile || !isMobile" class="header-menu">
          <Transition name="fade" mode="out-in">

            <LayoutHeaderNav v-if="isShowMobileMenu || !isMobile" @close="isShowMenu=false" />
            <LayoutHeaderPersonalMenu v-else-if="isShowPersonalMenu && isMobile"/>
          </Transition>

        </div>
      </Transition>
      <div v-if="userFullData" class="header-personal">
        <div @click="togglePersonalMenu" class="header-personal__button">
          <BaseProfileCircle
              unfull
              :img="userFullData?.personal_data.photo" />
          <div class="header-personal__button-arrow">
            <BaseIconArrow color="white" :nav="isShowPersonalMenu? 'up': 'drop'" />
          </div>
        </div>
        <LayoutHeaderPersonalMenu v-if="isShowPersonalMenu && !isMobile"/>
      </div>

      <LayoutHeaderBurger @click="toggleMobileMenu" :active="isShowMobileMenu" :color="isShowPersonalMenu? 'light-teal': 'violet'" />

    </div>
  </header>
</template>

<style scoped lang="scss">

.header {
  width: 100vw;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  height: 96px;
  //background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 70%, rgba(255,255,255, 0) 100%);
  background: linear-gradient(180deg, rgb(178, 225, 218), 0%, rgba(178, 225, 218, 1) 30%, rgba(178, 225, 218, 0.95) 60%,rgba(178, 225, 218, 0.85) 70%, rgba(178, 225, 218, 0.6) 82%, rgba(178, 225, 218, 0) 100%);
  z-index: 11;
  transition: top 0.5s;
  @media (max-width: $sm) {
    height: auto;
    &:before {
      background: linear-gradient(180deg, rgb(71, 69, 109), 0%, rgba(71, 69, 109, 1) 30%, rgba(71, 69, 109, 0.95) 60%,rgba(71, 69, 109, 0.85) 70%, rgba(71, 69, 109, 0.6) 82%, rgba(71, 69, 109, 0) 100%);
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
    &.--violet-gradient {
      &:before {
        opacity: 1;
      }

    }

  }


  &--hidden {
    top: -77px;
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
      column-gap: 16px;
      row-gap: 0;
      flex-wrap: wrap;
    }
  }
  &-logo {
    height: 60px;
    width: auto;
    @media (max-width: $sm) {
      margin: 26px auto 26px 0;
    }
    img, svg{
      height: 100%;
      width: 100%;
    }
  }
  &-menu {
    width: 100%;
    @media (max-width: $sm) {
      width: 100vw;

      display: grid;
      grid-template-rows: 1fr;
      order: 2;


    }
    &__button {
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
  }
  &-personal {
    position: relative;
    display: flex;
    @media (max-width: $sm) {
      position: relative;
      margin: 14px 0;
    }
    &__button {
      cursor: pointer;
      padding: 0 5px 5px;
      border-radius: 20px;
      display: flex;
      gap: 8px;
      &-arrow {
        box-sizing: content-box;
        width: 10px;
        height: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 5px;
        background-color: $violet;
        position: absolute;
        bottom: 0px;
        right: -1px;
        border: 1px solid $white-text;

      }
    }
  }
}
.slide-dropdown-leave-active,
.slide-dropdown-enter-active {
  transition: all .8s ease;
  overflow: hidden;
}
.slide-dropdown-enter-from,
.slide-dropdown-leave-to {
  opacity: 0;
  grid-template-rows: 0fr;
}
</style>