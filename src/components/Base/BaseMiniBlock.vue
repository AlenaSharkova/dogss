<script setup lang="ts">
import {defineProps, withDefaults} from "vue";

withDefaults(
    defineProps<{
      text: string;
    }>(), {
      text: ''
    }
)
</script>

<template>
  <div class="base-mini-block">
    <div class="base-mini-block__wrapper">
      <span class="base-mini-block__text">{{text}}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-mini-block {
  background-color: $violet;
  color: $white-text;
  width: max-content;
  border-radius: 10px;
  box-shadow: $box-shadow-middle;
  &__wrapper {
    padding: 10px 15px;
  }
  &__text {
    text-wrap: nowrap;
  }
}
</style>