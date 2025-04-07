<script setup lang="ts">

</script>

<template>
  <div class="wrapper-page">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.wrapper-page {
  padding: 50px 50px;
  @media (max-width: $md) {
    padding: 50px 30px;
  }
  @media (max-width: $xs) {
    padding: 50px 20px;
  }
}
</style>