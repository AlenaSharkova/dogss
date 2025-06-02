<script setup lang="ts">
defineProps({
  image: String,
})
</script>

<template>
  <div class="base-wrapper__dogs">
    <div class="base-wrapper__dogs-image">
      <img :src="`/image/beautiful_dogs/${image}.jpg`">
    </div>
    <div class="base-wrapper__dogs-content">
      <slot></slot>
    </div>
  </div>

</template>

<style scoped lang="scss">
.base-wrapper__dogs {
  margin-top: 50px;
  display: flex;
  gap: 20px;
  align-items: start;
  justify-content: space-between;
  @media (max-width: $sm) {
    align-items: center;
    justify-content: center;
  }
  &-image {
    border-radius: 40px;
    width: 40%;
    height: 80vh;
    max-width: 1100px;
    @media (max-width: $sm) {
      width: 100%;
      opacity: 0.7;
      top: 0;
      right: 0;
      height: 100%;
      border-radius: 0;
      position: absolute;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
      object-position: center;

      @media (max-width: $sm) {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        opacity: 0.7;
      }
    }
  }
  &-content {
    @media (max-width: $sm) {
      z-index: 1;
      //position: absolute;
      //backdrop-filter: blur(10px);
    }
    &-text {
      @include h6;
      text-align: center;
      color: $violet;
    }

  }
}
</style>