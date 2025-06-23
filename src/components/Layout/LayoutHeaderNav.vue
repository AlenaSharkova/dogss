<script setup lang="ts">
import {defineEmits} from "vue";
import {useAuthStore} from "~/stores/auth.store";
import BaseInfoCount from "~/components/Base/BaseInfoCount.vue";

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

</script>

<template>
  <div class="header-nav">
    <div class="header-nav__links">
      <nuxt-link class="header-nav__item" to="/breeders">
        Питомник
      </nuxt-link>
      <nuxt-link class="header-nav__item" to="/catalog">
        Каталог
      </nuxt-link>
      <nuxt-link class="header-nav__item" to="/dev-new">
        dev-new
      </nuxt-link>
      <nuxt-link class="header-nav__item" to="/personal">
        personal
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
      <span v-else-if="userFullData">Привет, {{userFullData.personal_data.email}} </span>

      <BaseButton
          v-if="userFullData"
          class="header-nav__actions-login"
          text="Войти"
          size="small"
          to="/auth/login"
          type="secondary" />
      <BaseButton
          v-if="userFullData"
          class="header-nav__actions-login"
          text="Выйти"
          size="small"
          type="secondary"
          @click="logout"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.header-nav {
  width: 100%;
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: space-between;

  &__links {
    padding: 12px;

    display: flex;
    gap: 30px;
  }
  &__item {
    cursor: pointer;
    border-radius: 8px;
    color: $dark-text;
    transition: background 0.2s;
    font-weight: 400;
    font-size: 16px;
    line-height: 125%;
    text-wrap: nowrap;
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
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