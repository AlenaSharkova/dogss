<script setup lang="ts">
const props = defineProps({
  modal: {
    type: Boolean,
    required: false,
    default: false,
  },
});

</script>

<template>
  <div class="form-window">
    <div class="form-window__content">
      <div class="form-window__header">
        <div class="form-window__header-title">
          <span>
            <slot name="title" />
          </span>
        </div>
        <div
            v-if="$slots.subtitle || $slots['subtitle-infallible']"
            class="form-window__header-subtitle"
        >
          <span v-if="$slots.subtitle">
            <slot name="subtitle" />
          </span>
          <span v-if="$slots['subtitle-infallible']" class="subtitle-infallible">
            <slot name="subtitle-infallible" />
          </span>
        </div>
      </div>
      <div class="form-window__list">
        <slot></slot>
      </div>
      <div v-if="$slots['action-buttons']" class="form-window__action">
        <slot name="action-buttons" />

      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.form-window {
  margin: auto;
  border-radius: 24px;
  box-shadow: 0px 4px 24px 0px rgba(30, 30, 30, 0.1);
  max-width: 1000px;
  &__content {
    padding: 40px;
  }
  &__header {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    &-title {
      @include h3;
    }
    &-subtitle {
      @include subtitle-small;
    }

  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  &__action {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
}
</style>