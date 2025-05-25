<script setup lang="ts">
import {defineEmits} from "vue";
import {useAuthStore} from "~/stores/auth.store";

const emit = defineEmits(["close"]);

const authStore = useAuthStore()

const goToPage = (page: string) => {
 // router.push(page)
  //emit('close')
}

const logout = () => {
  goToPage('/dashboard/authorization')
}

const getUserData = () => {
  authStore.getUserData()
}
const userData = computed(() => authStore.userData )

onMounted( () => {
  getUserData()

})
const test = async () => {
  let user = {
    'email': JSON.stringify('alena.s_00@mail.ru')
  };
  await fetch('https://undo-wsc-uat.effortel-tech.com/api/integration/vl/registration/convert')
  await fetch('https://undo-wsc-uat.effortel-tech.com/api/integration/vl/registration/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
  await fetch('https://undo-wsc-uat.effortel-tech.com/api/integration/vl/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
  await fetch('https://undo-wsc-uat.effortel-tech.com/api/integration/vl/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
}
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
      <nuxt-link class="header-nav__item" to="/form">
        form
      </nuxt-link>
    </div>


    <div class="header-nav__actions">
      <BaseButton
          class="header-nav__actions-ad"
          text="Подать объявление"
          size="small"
          to="/create-ad" />
      <BaseButton
          v-if="!userData"
          class="header-nav__actions-login"
          text="Войти"
          size="small"
          to="/auth/login"
          type="secondary" />
      <span v-else>Привет, {{userData.email}} </span>
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

    //display: flex;
    gap: 30px;
    display: none;
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
    gap: 5px;
    flex-shrink: 0;
    &-ad {
      text-wrap: nowrap;
    }
  }
}
</style>