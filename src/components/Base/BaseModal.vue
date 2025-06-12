<script setup lang="ts">
const emit = defineEmits(["close"]);
const props = defineProps({
  isShowModal: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isShowModal" class="base-modal">
      <div @click="$emit('close')"  class="base-modal__mask"></div>
      <div class="base-modal__window">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.base-modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  overflow-y: auto;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  @media (max-width: $sm) {
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  &__mask {
    cursor: pointer;
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 40%;
    filter: blur(10px);
    z-index: 10;

  }
  &__window {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    z-index: 101;
    @media (max-width: $sm) {
      align-items: flex-end;
      z-index: 101;
      width: 100%;
      padding: 50px 0 0;
    }
  }

  &.--mobile-page {
    @media (max-width: $sm) {
      z-index: 101;
      overflow-y: visible;

      .base-modal__mask {
        display: none;
      }
      .base-modal__window {
        height: 100%;
        background-color: var(--white, #fff);
        display: block;
        z-index: 101;
        min-height: 100%;
        padding: 69px 0 60px 0;
      }
    }
  }
}
.fade-enter-from,
.fade-leave-to {
  .base-modal__mask {
    opacity: 0;
  }
  .base-modal__window {
    filter: blur(15px);
    opacity: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  .base-modal__mask {
    transition: all 0.4s;
  }
  .base-modal__window {
    transition: all 0.2s;
  }
  transition: all 0.4s;
}
</style>