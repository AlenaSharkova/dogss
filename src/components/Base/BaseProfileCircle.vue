<script setup lang="ts">

import {abbreviationName, getColorCircle} from "@/utils/getData";
import {computed, PropType} from "vue";

const props = withDefaults(defineProps<
    {
      name: string,
      size?: 'big' | 'medium' | "small" | "inherit",
      img?: string
}>(),
    {
      size: "small",
      img: ''
})

const classes = computed(() => {
  return {
    [`--big-size`]: props.size === 'big',
    [`--medium-size`]: props.size === 'medium',
    [`--inherit-size`]: props.size === 'inherit',
  };
});
</script>

<template>
  <div class="base-profile__circle"
       :style="!img? `background: ${getColorCircle( name )}`: ''"
       :class="{...classes}"
  >
    <img class="base-profile__circle-image" v-if="img" :src="img" />
    <span v-else class="base-profile__circle-text">{{ abbreviationName(name) }}</span>
  </div>

</template>

<style scoped lang="scss">

.base-profile__circle {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  @media (max-width: $sm) {
    width: 43px;
    height: 43px;
  }
  &.--inherit-size {
    width: inherit;
    height: inherit;
    .base-profile__circle-text {
      font-size: 40px;
      @media (max-width: $sm) {
        font-size: 25px;
      }
    }
  }

  &.--medium-size {
      width: 54px;
      height: 54px;
      @media (max-width: $sm) {
        width: 50px;
        height: 50px;
      }
    .base-profile__circle-text {
        font-size: 24px;
        @media (max-width: $sm) {
          font-size: 21px;
        }
    }
  }
  &.--big-size {
      width: 90px;
      height: 90px;
      @media (max-width: $md) {
        width: 80px;
        height: 80px;
      }
      @media (max-width: $sm) {
        width: 70px;
        height: 70px;
      }
    .base-profile__circle-text {
        font-size: 40px;
        @media (max-width: $sm) {
          font-size: 30px;
        }
    }
  }
  &-image {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
    border-radius: inherit;

  }
  &-text {
    font-weight: 400;
    font-size: 20px;
    color: var(--white, #fff);
    @media (max-width: $sm) {
      font-size: 18px;
    }
  }
}
</style>
