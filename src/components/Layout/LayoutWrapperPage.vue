<script setup lang="ts">

</script>

<template>
  <div class="wrapper-page">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.wrapper-page {
  padding: 50px 55px 50px 50px;
  @media (max-width: $md) {
    padding: 50px 35px 50px 30px;
  }
  @media (max-width: $xs) {
    padding: 50px 25px 50px 20px;
  }
}
</style>