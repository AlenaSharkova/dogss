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
  <Transition name="fade-modal">
    <div v-if="isShowModal" class="base-modal" >
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
  z-index: 12;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: $sm) {
    align-items: flex-end;
    justify-content: flex-end;
  }


  &__mask {
    cursor: pointer;
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(71, 69, 109, 0.6);
    backdrop-filter: blur(10px);
    z-index: 10;
  }
  &__window {
    display: flex;
    position: relative;
    z-index: 10;

    //display: block;
    max-height: 85%;
    min-height: 10%;
    margin: auto;
    overflow: hidden;
    opacity: 1;
    //height: 100%;


    @media (max-width: $sm) {
      width: 100%;
      margin: auto 0 0;
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
.fade-modal-enter-from, .fade-modal-leave-to {
  .base-modal__window {
    opacity: 0;
  }
}

.fade-modal-leave-active {
  .base-modal__mask {
    animation: blur-out 0.3s ease-in-out forwards;
  }
  .base-modal__window {
    transition: all 0.3s;
  }
  transition: all .3s;
}


.fade-modal-enter-active {
  .base-modal__mask {
    animation: blur-in .3s ease-in-out forwards;
  }
  .base-modal__window {
    transition: all .3s;
  }
  transition: all .3s;
}
@keyframes blur-in {
  from {
    backdrop-filter: blur(0px);
    background-color: rgba(71, 69, 109, 0);
  }
  to {
    backdrop-filter: blur(10px);
    background-color: rgba(71, 69, 109, 0.6);
  }
}
@keyframes blur-out {
  from {
    backdrop-filter: blur(10px);
    background-color: rgba(71, 69, 109, 0.6);
  }
  to {
    backdrop-filter: blur(0px);
    background-color: rgba(71, 69, 109, 0);
  }
}
</style>