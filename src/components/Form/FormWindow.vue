<script setup lang="ts">
import BaseIconArrow from "~/components/Base/BaseIcon/BaseIconArrow.vue";

const props = defineProps({
  modal: {
    type: Boolean,
    required: false,
    default: false,
  },
  withoutPadding: {
    type: Boolean,
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
       :class="[`--type-${type}`, {'--modal': modal} ]"
  >
    <div class="form-window__content" :class="{'--without-padding': withoutPadding}">
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
          <div class="form-window__header-subtitle__default" v-if="$slots.subtitle">
            <slot name="subtitle" />
          </div>
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
  max-width: 1024px;
  overflow: visible;


  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &.--modal {
    overflow: hidden;


    @media (max-width: $sm) {
      width: 100vw;
      border-radius: 24px 24px 0 0;
    }
    .form-window__list {
      overflow-y: auto;

    }
  }
  &.--type-default {
    background-color: white;
  }
  &.--type-original {
    position: relative;
    &:before {
      position: absolute;
      border-radius: 24px;
      content: '';
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      background-color: #ffffff11;
    }
  }
  &__content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    @media (max-width: $sm) {
      padding: 30px 20px;

    }
    &.--without-padding {
      padding: 40px 0 0;
      @media (max-width: $sm) {
        padding: 30px 0 0;
      }
      .form-window__header {
        padding: 0 40px;
        @media (max-width: $sm) {
          padding: 0 20px;
        }
      }
      .form-window__action {
        padding: 0 40px;
        @media (max-width: $sm) {
          padding: 0 20px;
        }
      }
    }
  }
  &__header {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    flex-grow: 0;
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
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      @include subtitle-small;
      text-align: center;
      &__default {
        width: 100%;
      }
      .subtitle-infallible {
        color: $error-text;
      }
    }

  }
  &__content {
    height: 100%;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    overflow-y: visible;
    padding-bottom: 20px;

    flex-grow: 1;

    @include scrollbar(transparent);

    @media (max-width: $sm) {

    }
  }
  &__action {
    margin-top: 28px;
    display: flex;
    gap: 10px;
    padding-bottom: 20px;
    @include scrollbar(transparent);

    @media (max-width: $sm) {

    }
  }
}
</style>