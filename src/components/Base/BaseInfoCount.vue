<script setup lang="ts">
import type {PropType} from "vue";
import type {IColorValue} from "~/struct/Common/IValueType";

defineProps({
  color: String as PropType<IColorValue>,
  text: String,
})
</script>

<template>
  <div class="base-info-count">
    <span>
      {{text}}
    </span>
  </div>
</template>

<style scoped lang="scss">
.base-info-count {
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $violet;
  color: $white-text;
  padding: 3px 8px;

  @include text-small();
  &.violet {
    background-color: $violet;
    color: $white-text;
  }
  &.dark {
    background-color: $dark-text;
    color: $white-text;
  }
  &.white {
    background-color: $white-text;
    color: $dark-text;
  }
  &.violet-opacity {
    background-color: $violet-opacity;
    color: $dark-text;
  }
  &.yellow {
    background-color: $yellow;
    color: $dark-text;
  }
  &.second-yellow {
    background-color: $second-yellow;
    color: $dark-text;
  }
  &.light-teal {
    background-color: $light-teal;
    color: $dark-text;
  }
  &.back {
    background-color: $back;
    color: $white-text;
  }
  &.error {
    background-color: $error;
    color: $white-text;
  }
}
</style>