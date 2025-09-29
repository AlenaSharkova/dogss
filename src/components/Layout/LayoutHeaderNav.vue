<script setup lang="ts">
import {computed, defineEmits} from "vue";
import {useAuthStore} from "~/stores/auth.store";
import BaseInfoCount from "~/components/Base/BaseInfoCount.vue";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import LayoutHeaderPersonalMenu from "~/components/Layout/LayoutHeaderPersonalMenu.vue";

const emit = defineEmits(["close"]);

const router = useRouter();
const authStore = useAuthStore()
const personalStore = usePersonalStore()

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
const togglePersonalMenu = () => {
  isShowPersonalMenu.value = !isShowPersonalMenu.value
}
const isShowMobileMenu = ref(false)

const toggleMobileMenu = () => {
  console.log('isShowMobileMenu.value', isShowMobileMenu.value)
  isShowMobileMenu.value = !isShowMobileMenu.value
  console.log('isShowMobileMenu.value', isShowMobileMenu.value)

}
</script>

<template>
  <div class="header-nav">
    <div class="header-nav__wrapper">
      <div class="header-nav__links">
        <nuxt-link class="header-nav__item" active-class="--active"  to="/breeders">
          Заводчики
        </nuxt-link>
        <nuxt-link class="header-nav__item" active-class="--active" to="/catalog">
          Найти питомца
        </nuxt-link>
      </div>


      <div class="header-nav__actions">
        <router-link to="/personal/favorites" class="header-nav__actions-favorites">
          <BaseIconHeart  />
          <BaseInfoCount :text="favoritesAdsCount" class="header-nav__actions-favorites__count" />
        </router-link>
        <BaseButton
            class="header-nav__actions-ad"
            text="Подать объявление"
            size="small"
            to="/create-ad" />
        <BaseButton
            v-if="!userFullData"
            class="header-nav__actions-login"
            text="Войти"
            size="small"
            to="/auth/login"
            type="secondary" />

      </div>
    </div>


  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.header-nav {
  width: 100%;

  @media (max-width: $sm) {
    overflow: hidden;
  }
  &__wrapper {
    align-items: center;
    flex-direction: row;
    display: flex;
    gap: 15px;
    @media (max-width: $sm) {
      padding-bottom: 70vh;

      flex-direction: column;

    }
  }
  &__links {
    padding: 12px;
    margin-right: auto;

    display: flex;
    gap: 30px;
    @media (max-width: $sm) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__item {
    cursor: pointer;
    //border-radius: 8px;
    color: $dark-text;
    transition: all 0.2s;
    font-weight: 400;
    font-size: 16px;
    line-height: 125%;
    text-wrap: nowrap;
    position: relative;
    padding: 3px;
    @include subtitle-small(500);
    display: block;
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: -5px;
      background-color: $second-yellow;
      opacity: 0;
      height: 2px;
      transition: all .2s;
    }
    &.--active {
      color: $violet;
      &:after {
        opacity: 1;
        left: 0%;
        right: 0%;
      }
    }
    &:hover {
      color: $violet;
      &:after {
        //width: 100%;
        //background-color: $violet-opacity;
        opacity: 1;
        left: 0%;
        right: 0%;
      }

    }
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    @media (max-width: $sm) {
      //flex-direction: column;
      //align-items: flex-start;
      gap: 20px;

    }
    &-favorites {
      position: relative;
      cursor: pointer;
      width: 29px;
      height: 29px;
      margin-right: 10px;
      &__count {
        z-index: -1;
        position: absolute;
        top: -15px;
        right: -10px;
      }
    }
    &-ad {
      text-wrap: nowrap;
    }
  }

}
</style>