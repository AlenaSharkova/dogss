<script setup lang="ts">
import BaseIconArrow from "~/components/Base/BaseIcon/BaseIconArrow.vue";

const props = defineProps({
  modal: {
    type: Boolean,
    required: false,
    default: false,
  },
  isPrev: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String as PropType<'original' | 'default'>,
    default: 'default',
  }
});

const emits = defineEmits(['prev'])

const prev = () => {
  emits('prev')
}
</script>

<template>
  <div class="form-window"
       :class="`--type-${type}`"
  >
    <div class="form-window__content">
      <div class="form-window__header">
        <div v-if="isPrev" @click="prev" class="form-window__header-prev">
          <BaseIconArrow nav="left" />
        </div>
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
  border-radius: 24px;
  box-shadow: 0px 4px 24px 0px rgba(30, 30, 30, 0.1);
  max-width: 1000px;
  &.--type-default {
    background-color: white;

  }
  &.--type-original {
    backdrop-filter: blur(10px);

    //background-color: #bba496D0;
    //background-color: #c2afa1;
    //background: url("@/assets/image/balls_back.jpg") no-repeat center center;

  }
  &__content {
    padding: 40px;
    @media (max-width: $sm) {
      padding: 30px 20px;

    }
  }
  &__header {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    &-prev {
      width: 20px;
      height: 22px;
      left: 0;
      top: 15px;
      position: absolute;
      cursor: pointer;
    }
    &-title {
      @include h3;
    }
    &-subtitle {
      display: flex;
      align-items: center;
      flex-direction: column;
      @include subtitle-small;
      text-align: center;
      .subtitle-infallible {
        color: $error-text;
      }
    }

  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  &__action {
    margin-top: 28px;
    display: flex;
    gap: 10px;
  }
}
</style>