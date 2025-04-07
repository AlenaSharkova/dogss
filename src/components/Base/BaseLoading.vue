<script setup lang="ts">

</script>

<template>
  <div class="base-loading">
    <div class="base-loading-wrapper">
      logooo
      <div class="base-loading-ring">
        <img class="base-loading-ring__icon" src="@/assets/image/loading-ring.png">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.base-loading {
  height: 100vh;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  &.unloading {
    background-image: none;
  }
  &-wrapper {
    margin: auto;
    padding: 30px 0;
    width: 606px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 56px;
    @media (max-width: $sm) {
      width: 100%;
    }
  }
  &-logo {
    width: 273px;
    height: 48px;
  }
  &-ring {
    width: 64px;
    height: 64px;
    &__icon {
      height: 100%;
      animation: 0.8s linear infinite rotate;
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

</style>