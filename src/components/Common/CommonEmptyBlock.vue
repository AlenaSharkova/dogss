<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    default: 'Ничего не найдено..'
  }
})
</script>

<template>
  <div class="empty-block">
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
