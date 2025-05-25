<script setup lang="ts">
import type {PropType} from "vue";
import type {IColorValue} from "~/struct/Common/IValueType";

defineProps({
  color: String as PropType<IColorValue>,
})
</script>

<template>

  <svg :class="color"
       width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_623_10848)">
      <path d="M18.2997 6.20997C17.9097 5.81997 17.2797 5.81997 16.8897 6.20997L11.9997 11.09L7.10973 6.19997C6.71973 5.80997 6.08973 5.80997 5.69973 6.19997C5.30973 6.58997 5.30973 7.21997 5.69973 7.60997L10.5897 12.5L5.69973 17.39C5.30973 17.78 5.30973 18.41 5.69973 18.8C6.08973 19.19 6.71973 19.19 7.10973 18.8L11.9997 13.91L16.8897 18.8C17.2797 19.19 17.9097 19.19 18.2997 18.8C18.6897 18.41 18.6897 17.78 18.2997 17.39L13.4097 12.5L18.2997 7.60997C18.6797 7.22997 18.6797 6.58997 18.2997 6.20997Z" fill="#958F9C"/>
    </g>
  </svg>

</template>

<style scoped lang="scss">
svg {
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
}
</style>