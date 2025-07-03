<script setup lang="ts">
import type {PropType} from "vue";
import type {IColorValue, INavValue} from "~/struct/Common/IValueType";

defineProps({
  color: String as PropType<IColorValue>,
  nav: String as PropType<INavValue>,
})
</script>

<template>
  <svg :class="[color, nav]" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 1.125L9.52279 6.60221C8.81985 7.30515 7.68015 7.30515 6.97721 6.60221L1.5 1.125" stroke="#958F9C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<style scoped lang="scss">
svg {
  width: inherit;
  height: auto;
  transition: all 0.3s;
  &.up {
    transform: rotateX(180deg);
  }
  &.left {
    transform: rotate(90deg);
  }
  &.right {
    transform: rotate(270deg);
  }

  &.violet path {
    stroke: $violet
  }
  &.dark path {
    stroke: $dark-text
  }
  &.white path {
    stroke: $white-text;
  }
  &.violet-opacity path {
    stroke: $violet-opacity;
  }
  &.yellow path {
    stroke: $yellow;
  }
  &.second-yellow path {
    stroke: $second-yellow;
  }
  &.light-teal path {
    stroke: $light-teal;
  }
  &.back path {
    stroke: $back;
  }
  &.error path {
    stroke: $error;
  }
}
</style>