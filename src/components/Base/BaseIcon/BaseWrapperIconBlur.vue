<script lang="ts" setup>

</script>

<template>
  <div class="base-wrapper-icon-blur">
    <div class="base-wrapper-icon-blur__icon">
      <slot class="icon" />

    </div>
  </div>
</template>

<style scoped lang="scss">
.base-wrapper-icon-blur {
  right: 10px;
  bottom: 10px;
  z-index: 2;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  box-shadow: $box-shadow-middle;
  transition: all .3s;
  background-color: rgba(227, 237, 227, 0.6);
  cursor: pointer;
  &__icon {
    width: 18px;
    height: 18px;
    &::slotted(svg) {
      color: red;

    }
    &:host(svg) {
      color: red;

    }
    svg {
      color: red;
    }

    .icon {

      &::slotted(svg) {
        color: red;

      }
      &:host(svg) {
        color: red;

      }
    }
  }
  &:hover {
    box-shadow: $box-shadow-dark;
  }
}
</style>