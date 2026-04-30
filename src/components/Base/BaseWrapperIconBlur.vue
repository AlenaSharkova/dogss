<script lang="ts" setup>

import type {PropType} from "vue";

const props = defineProps({
  color: {
    type: String as PropType<'light-teal' | 'grey'>,
    required: false,
    default: 'grey'
  },
  size: {
    type: String as PropType<'light' | 'medium' | 'big'>,
    required: false,
    default: 'light'
  },
})

</script>

<template>
  <div class="base-wrapper-icon-blur" :class="[`--color-${color}`, `--size-${size}`]">
    <div class="base-wrapper-icon-blur__icon">
      <slot class="icon" />

    </div>
  </div>
</template>

<style scoped lang="scss">
.base-wrapper-icon-blur {
  z-index: 2;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  box-shadow: $box-shadow-middle;
  transition: all .3s;
  background-color: rgba(227, 237, 227, 0.6);
  cursor: pointer;
  flex-shrink: 0;
  &.--color-grey {
    background-color: rgba(227, 237, 227, 0.6);

  }
  &.--color-light-teal {
    background-color: $light-teal-99;
  }
  &.--size-light {
    width: 30px;
    height: 30px;
  }
  &.--size-medium {
    width: 35px;
    height: 35px;
  }
  &__icon {
    width: 18px;
    height: 18px;
  }
  &:hover {
    box-shadow: $box-shadow-dark;
  }
}
</style>