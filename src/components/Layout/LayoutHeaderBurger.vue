<script setup lang="ts">
import {defineEmits, type PropType} from "vue";
import {useAuthStore} from "~/stores/auth.store";
import BaseInfoCount from "~/components/Base/BaseInfoCount.vue";

const emit = defineEmits(["close"]);

defineProps({
  active: {
    type: Boolean,
    default: false
  },
  color: {
    type: String as PropType<'violet' | 'light-teal'>,
    default: false
  }
})

</script>

<template>
  <div class="header-burger" :class="{'--active': active}">
    <div class="header-burger__wrapper">
      <div class="header-burger__block">
        <div class="header-burger__lines" :class="`--${color}`">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-burger {
  height: 32px;
  width: 32px;
  display: none;
  @media (max-width: $sm) {
    display: block;
  }

  &.--active {
    .line1 {
      transform: rotate(45deg);
    }

    .line2 {
      transform: scaleY(0);
    }

    .line3 {
      transform: rotate(-45deg);
    }

  }

  &__block {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 5;
    cursor: pointer;
  }

  &__lines {
    height: 26px;
    width: 32px;
    top: 17px;
    left: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.--light-teal {
      .line {
        background: $light-teal;
      }
    }
    .line {
      transition: all 0.3s;
      display: block;
      height: 4px;
      width: 100%;
      border-radius: 10px;
      background: $violet;
    }

    .line1 {
      transform-origin: 0% 0%;
      transition: transform 0.4s ease-in-out;
    }

    .line2 {
      transition: transform 0.2s ease-in-out;
    }

    .line3 {
      transform-origin: 0% 100%;
      transition: transform 0.4s ease-in-out;
    }
  }
}
</style>