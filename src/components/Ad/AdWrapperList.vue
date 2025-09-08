<script setup lang="ts">



defineProps({
  hasFilter: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
<div class="ad-list" :class="{'--has-filter': hasFilter}">
  <div class="ad-list__wrapper">
    <div class="ad-list__row">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.ad-list {
  &.--has-filter {
    .ad-list__row {
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-columns: 1fr;
      grid-auto-rows: 1fr;
      gap: 20px;
      @media (max-width: $md) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: $sm) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media (max-width: $xs) {
        grid-template-columns: 1fr 1fr;

        grid-auto-columns: auto;
      }
      @media (max-width: $xss) {
        display: flex;
        flex-direction: column;
      }
    }
  }
  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 20px;
    @media (max-width: $sm) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: $xss) {
      grid-template-columns: 1fr;

      grid-auto-columns: auto;
    }
  }

}
</style>