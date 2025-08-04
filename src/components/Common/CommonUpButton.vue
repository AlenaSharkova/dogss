<script setup lang="ts">
import {useCommonStore} from "~/stores/common.store";


const commonStore = useCommonStore()

const isVisible = computed(() => commonStore.isScrolled);


const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};



// Когда пользователь нажимает на кнопку, прокручиваем страницу вверх

</script>

<template>
  <Transition name="fade">
    <button
        id="backToTopBtn"
        v-if="isVisible"
        @click="scrollToTop"
        title="Go to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped lang="scss">

#backToTopBtn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 12;
  border: none;
  outline: none;
  //background-color: $light-teal;
  backdrop-filter: blur(2px);

  background-color: $violet-opacity;
  cursor: pointer;
  padding: 10px;
  border-radius: 25%;
  font-size: 16px;
  transition: all 0.2s ease-out;
  box-shadow: 0 2px 5px rgba(30, 30, 30, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(30, 30, 30, 0.3);
  }

  svg {
    width: 28px;
    height: 28px;
    fill: $white-text;
  }
}
</style>