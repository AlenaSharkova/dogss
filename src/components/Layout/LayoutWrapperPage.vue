<script setup lang="ts">
defineProps({
  isPaddingX: {
    type: Boolean,
    default: true
  },
})
</script>

<template>
  <div class="wrapper-page" :class="{'--without-padding-x': !isPaddingX}">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.wrapper-page {
  padding: 50px 55px 50px 50px;
  &.--without-padding-x {
    padding-left: 0!important;
    padding-right: 0!important;
  }
  @media (max-width: $md) {
    padding: 50px 35px 50px 30px;
  }
  @media (max-width: $xs) {
    padding: 50px 25px 50px 20px;
  }
}
</style>