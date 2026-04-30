<template>
  <div class="base-filter" :class="[size]">
    <div class="base-filter__main">
      <button
          class="base-filter__main-button"
          @click.stop="open = !open"
          :class="[{ active: open }]"
      >
        <div class="base-filter__main-button__text" v-if="text">
          <span>{{ text }}</span>
        </div>
        <div class="base-filter__main-button__placeholder" v-else>
          {{ props.placeholder }}
        </div>
        <div
            class="base-filter__main-button__arrow"
            :class="{ flipped: open, active: text }"
        >
          <svg
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M15 1.125L9.52279 6.60221C8.81985 7.30515 7.68015 7.30515 6.97721 6.60221L1.5 1.125"
                stroke="#958F9C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
    <div v-if="open" class="base-filter__mask" />
    <Transition name="slide-dropdown">
      <div
          v-show="open"
          v-if="position != 'static'"
          class="base-filter__dropdown"
      >
        <div class="base-filter__dropdown-wrapper">
          <slot />
        </div>
      </div>
    </Transition>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>
<script setup lang="ts">

const props = withDefaults(
    defineProps<{
      placeholder: string;
      text: string;
      size?: string;
      position?: string;
    }>(),
    {
      position: "",
      size: "",
    },
);

const emit = defineEmits(["close"]);
const error = ref("");

const open = defineModel<boolean>();
</script>
<style scoped lang="scss">
.base-filter {
  position: relative;
  font-size: 15px;
  font-weight: 400;
  &__mask {
    display: none;
    @media (max-width: $sm) {
      cursor: pointer;
      display: block;
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 12;
      background-color: #000;
      opacity: 40%;
    }
  }
  &.small {
    @media (max-width: $lg) {
      font-size: 14px;
      .base-filter {
        &__main {
          min-width: 164px;
          &-button {
            padding: 8px 12px;
            @media (max-width: $sm) {
              padding: 12px;
            }
          }
        }
      }
    }
  }
  &__main {
    width: 100%;
    min-width: 200px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &-button {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 14px 12px;
      align-items: center;
      border: 1px solid var(--border, #d3d8e6);
      border-radius: 8px;
      background: var(--white, #fff);
      transition: border 0.3s;
      gap: 15px;
      cursor: pointer;
      &:hover {
        border: 1px solid var(--primary, #2d2d2d);
      }
      &.active {
        border: 1px solid var(--primary, #2d2d2d);
        .base-filter__main-button__placeholder {
          color: var(--primary, #2d2d2d);
        }
      }
      &__text {
        color: var(--primary, #2d2d2d);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &__placeholder {
        color: var(--secondary, #958f9c);
        transition: color 0.2s;
      }
      &__arrow {
        width: 10px;
        transition: transform 0.5s;
        flex-shrink: 0;
        &.flipped {
          svg {
            transform: rotate(-0.5turn);
          }
        }
        &.active {
          svg {
            path {
              stroke: #2d2d2d;
            }
          }
        }
        svg {
          width: 100%;
          height: auto;
          transition: transform 0.5s;
          path {
            transition: stroke 0.5s;
          }
        }
      }
    }
  }
  &__dropdown {
    display: grid;
    grid-template-rows: 1fr;
    position: absolute;
    z-index: 10;
    min-width: max-content;
    padding-top: 4px;
    @media (max-width: $sm) {
      position: fixed;
      z-index: 14;
      left: 0;
      bottom: 0;
      right: 0;
    }
    &-wrapper {
      overflow: hidden;
      height: 100%;
    }
  }
}
.slide-dropdown-leave-active,
.slide-dropdown-enter-active {
  transition: all 0.2s ease;
}
.slide-dropdown-enter-from,
.slide-dropdown-leave-to {
  opacity: 0;
  grid-template-rows: 0fr;
}
</style>
