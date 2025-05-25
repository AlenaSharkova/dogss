<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type {RouteLocationRaw} from "#vue-router";

interface Props {
  text: string;
  type?: 'primary' | 'secondary' | 'teriary';
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
    [`${base}__type--primary`]: props.type === 'primary',
    [`${base}__type--secondary`]: props.type === 'secondary',
    [`${base}__type--teriary`]: props.type === 'teriary',
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: system-ui, sans-serif;
  //font-family: "Unbounded", sans-serif;
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;

  font-weight: 500;
  //@include text-upper();

  line-height: 20px;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  transition: border 0.3s;

  box-shadow: $box-shadow-second;
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
      &.base-button__disabled {
        opacity: 0.5;
      }
    }
    &--secondary {
      color: var(--primary, #2D2D2D);
      border: 1px solid var(--border, #D3D8E6);
      background: var(--white, #FFF);
      &:hover {
        border: 1px solid var(--primary, #2D2D2D);
      }
      &.base-button__disabled {
        border: 1px solid var(--border, #D3D8E6);
      }
    }
    &--teriary {
      color: $violet;
      border: $light-teal;
      background: $light-teal;
      &.base-button__disabled {
        color: var(--border, #D3D8E6);
      }
    }
  }
  &__disabled {
    color: var(--secondary, #958F9C);
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