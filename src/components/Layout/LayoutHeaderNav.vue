<script setup lang="ts">
import {defineEmits} from "vue";

const emit = defineEmits(["close"]);

const goToPage = (page: string) => {
 // router.push(page)
  //emit('close')
}

const logout = () => {
  goToPage('/dashboard/authorization')
}

</script>

<template>
  <div class="header-nav">
    <div class="header-nav__links">
      <nuxt-link class="header-nav__item" to="/breeder">
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
      <BaseButton text="Подать объявление" size="small" to="/create-ad" />
      <BaseButton text="Войти" size="small" to="/login" type="secondary" />
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
    gap: 5px;
    flex-shrink: 0;
  }
}
</style>