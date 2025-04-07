<script setup lang="ts">
const props = defineProps({
  name: String,
  active: Boolean,
  hover: Boolean
})
</script>

<template>
  <svg class="icon-heart" :class="{hover: hover, active: active}"
       xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 497 470">
    <path d="M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z" stroke="red" stroke-width="30" fill="none" />
  </svg>

</template>

<style scoped lang="scss">
.icon-heart {
  path {
    stroke: rgba(0, 0, 0, 0.65);
    fill: rgba(207, 26, 26, 0);

    transition: all 0.2s;
  }
  &.hover {
    path {
      stroke: rgba(158, 21, 21, 0.65);
    }
  }
  &.active {
    path {
      fill: rgba(207, 26, 26, 1);
      stroke: rgba(255, 35, 35, 1);

    }
  }
}
</style>