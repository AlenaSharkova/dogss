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
  &.up {
    transform: rotate(180deg);
  }
  &.left {
    transform: rotate(90deg);
  }
  &.right {
    transform: rotate(270deg);
  }

  &.violet path {
    fill: $violet
  }
  &.dark path {
    fill: $dark-text
  }
  &.white path {
    fill: $white-text;
  }
  &.violet-opacity path {
    fill: $violet-opacity;
  }
  &.yellow path {
    fill: $yellow;
  }
  &.second-yellow path {
    fill: $second-yellow;
  }
  &.light-teal path {
    fill: $light-teal;
  }
  &.back path {
    fill: $back;
  }
  &.error path {
    fill: $error;
  }
}
</style>