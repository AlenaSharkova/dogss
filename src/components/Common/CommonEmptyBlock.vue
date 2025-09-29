<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    default: 'Ничего не найдено..'
  },
  miniStyle: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="empty-block" :class="{'--mini-style': miniStyle}">
    <div class="empty-block__row">
      <div class="empty-block__icon">
        <BaseIconEmpty />
      </div>
      <div class="empty-block__text">
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.empty-block {
  padding: 100px 0 176px;
  @media (max-width: $sm) {
    //padding: 24px 0;
    height: auto;
    height: 100%;
  }
  &.--mini-style {
    padding: 10px 0 16px;
    .empty-block {
      &__row {
        display: flex;
        flex-direction: row;
        gap: 16px;
        align-items: center;
        justify-content: center;
        @media (max-width: $xs) {
          gap: 5px;
          flex-direction: column;
        }
      }
      &__icon {
        width: 100px;
        @media (max-width: $sm) {
          width: 80px;
        }
      }
      &__text {
        @include h6();
        color: $dark-text;
        text-align: center;
      }
    }
  }
  &__row {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    @media (max-width: $lg) {
      gap: 16px;
    }
  }
  &__icon {
    width: 257px;
    @media (max-width: $sm) {
      width: 157px;
    }
  }
  &__text {
    @include h3();
    color: $dark-text;
    text-align: center;
  }
}
</style>
