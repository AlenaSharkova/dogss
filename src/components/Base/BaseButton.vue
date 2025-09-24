<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type {RouteLocationRaw} from "#vue-router";

interface Props {
  text: string;
  type?: 'primary' | 'secondary' | 'teriary' | 'violet' | 'red';
  disabled?: boolean;
  to?: PropType<RouteLocationRaw>[] | string | null;
  size?: 'large' | 'medium' | 'small';
  load?: boolean;
  unfull?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  disabled: false,
  to: null,
  size: 'large',
  load: false,
  unfull: false,
})

const classes = computed(() => {
  const base = 'base-button';
  return {
    [`${base}__size--large`]: props.size === 'large',
    [`${base}__size--medium`]: props.size === 'medium',
    [`${base}__size--small`]: props.size === 'small',
    [`${base}__type--${props.type}`]: props.type,
    [`${base}__disabled`]: props.disabled || props.load,
    [`${base}__unfull`]: props.unfull,
  };
});
const binding = computed(() => ({
  ...(props.to && { to: props.to })
}));
const tag = computed(() => (props.to ? 'router-link' : 'button'));
</script>

<template>
  <component
    :is="tag"
    class="base-button"
    :class="{ ...classes }"
    v-bind="{ ...binding, ...$attrs }"
  >
    <div v-show="load" class="load">
      <img src="@/assets/image/svg/spinner-default.svg">
    </div>
    <span :class="{hidden: load}">{{ props.text }}</span>
  </component>
</template>

<style scoped lang="scss">

.base-button {
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;
  font-family: "Montserrat", sans-serif;

  font-weight: 500;
  //@include text-upper();

  line-height: 20px;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  transition: box-shadow 0.3s, background-color 0.1s, border 0.3s;
  box-shadow: $box-shadow-lite;

  &:hover {
    box-shadow: $box-shadow-middle
  }
  span {
    &.hidden {
      opacity: 0;
    }
  }
  &__size {
    &--large {
      padding: 16px 22px;
      min-width: 150px ;
      @media (max-width: $sm) {
        padding: 11px 22px;
        font-size: 15px;
      }
    }

    &--medium {
      padding: 12px 20px;
      @media (max-width: $sm) {
        padding: 8px 20px;
        font-size: 15px;
      }
    }
    &--small {
      padding: 10px 20px;
      font-size: 14px;
    }
  }
  &__type {
    &--primary {
      color: $violet;
      background: $yellow;
      &:hover {
       // border: 1px solid #5E5E5E;
      }
      &:active {
        background: $second-yellow;
      }
      &.base-button__disabled {
        opacity: 0.5;
      }
    }
    &--secondary {
      color: $violet;
      border: 1px solid $violet-opacity-max;
      background: $white-text;

      &:hover {
        border: 1px solid $violet-opacity;
      }
      &:active {
        background: $violet-opacity;
        // border: 1px solid #5E5E5E;
      }
      &.base-button__disabled {
        border: 1px solid $violet-opacity-max;
        color: $violet-opacity-66;
      }
    }
    &--teriary {
      color: $violet;
      border: 1px solid $light-teal;
      background: $light-teal;
      &:hover {
        //border: 1px solid darken($light-teal, 10%)
        //background: darken($light-teal, 10%);

      }
      &:active {
        background: darken($light-teal, 10%);
        background: darken($light-teal, 10%);

        // border: 1px solid #5E5E5E;
      }
      &.base-button__disabled {
        color: $violet-opacity-66;
        border: $light-teal-44;
        background: $light-teal-44;
      }
    }
    &--violet {
      color: $white-text;
      border: $violet;
      background: $violet;
      &.base-button__disabled {
        color: $white-text;
        border: $violet-opacity-max;
        background: $violet-opacity-max;
      }
    }
    &--red {
      color: $white-text;
      border: $error-border;
      background: $error;
      &.base-button__disabled {
        color: var(--border, #D3D8E6);
      }
    }
  }
  &__disabled {
    //color: $violet-opacity;
    //opacity: 0.8;
    background: var(--white, #FFF);
    pointer-events: none;
  }
  &__unfull {
    width: max-content !important;
  }
  .load {
    position: absolute;
    height: 24px;
    img {
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