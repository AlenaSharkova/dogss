<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";

defineProps({
  text: {
    type: String,
    default: ''
  },
  position: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  }
})
const isPopup = ref(false)


const onFocus = () => {
  isPopup.value = true
}
const onBlur = () => {
  isPopup.value = false
}
</script>

<template>
  <div @mouseenter="onFocus"
       @mouseleave="onBlur"
       class="base-with-mini-popup"
  >
    <slot></slot>
    <Transition name="fade">
      <div v-if="isPopup" class="base-with-mini-popup__main" :class="`--${position}`">
        <div class="base-with-mini-popup__wrapper">
          <p v-html="text" class="base-with-mini-popup__text"></p>
        </div>
      </div>
    </Transition>
  </div>

</template>

<style scoped lang="scss">
.base-with-mini-popup {
  position: relative;

  &__main {
    position: absolute;
    bottom: 100%;
    right: 2px;
    width: 200px;
    height: auto;
    max-height: 800px;
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: $box-shadow-middle;
    background-color: $back;
    margin-bottom: 4px;
    &.--left {
      left: 2px;
    }
  }
  &__wrapper {
    padding: 7px 10px;
  }
}
</style>