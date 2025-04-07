<script setup lang="ts">
import {ref, watch, computed, onMounted} from 'vue'
import {formatAmount, formatAmountInput} from "../../utils/formatData";

const props = defineProps({
  minValue: {
    type: Number,
    required: false,
    default: 0
  },
  maxValue: {
    type: Number,
    required: false,
    default: 5
  },
  step: {
    type: Number || String,
    required: false,
    default: 0.1
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
})
const emit = defineEmits(['change'])
//const widthProgress = ref(0)
const valueProgress = defineModel<number>({ default: 0 })
const inputRange = ref()
const focus = ref(false)
const onFocus = () => {
  focus.value = true
}
const onBlur = () => {
  focus.value = false
}
const widthProgress = ref(0)
const onInput = () => {
  if(valueProgress.value / ( props.maxValue - props.minValue) >= 0.5 ) widthProgress.value = (  valueProgress.value / ( props.maxValue - props.minValue) - 1/inputRange.value.offsetWidth)*100
  else widthProgress.value = (  valueProgress.value / ( props.maxValue - props.minValue) + 1/inputRange.value.offsetWidth)*100
}

onMounted(() => [
  onInput()
])
</script>

<template>
  <div class="base-range" :class="{disabled}">
    <input v-model="valueProgress"
           ref="inputRange"
           type="range"
           :min="minValue"
           :max="maxValue"
           :step="step"
           :disabled="disabled"
           @mouseover="onFocus"
           @input="onInput"
           @mouseout="onBlur"
           @change="$emit('change', valueProgress)"
           class="base-range__slider"
    >
    <div class="progress" :style="`width: calc(${widthProgress}%)`"></div>
    <Transition name="fade">
      <div v-show="focus" class="tooltip" :style="`left: calc(${widthProgress}% - 37px)`">
        <div class="tooltip-after">
          <svg width="16" height="6" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.53088 5.45305C7.32047 6.18024 8.66955 6.18231 9.46232 5.45925C9.46683 5.45514 9.46893 5.45319 9.47346 5.4491C9.61558 5.32059 13.1919 2.08696 15.5 0C9.64214 1.64366e-06 0.5 4.20885e-06 0.5 4.20885e-06L6.53088 5.45305Z" fill="#2D2D2D"/>
          </svg>
        </div>
        <span class="tooltip-text">{{ formatAmountInput(valueProgress) }}%</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

.base-range {
  position: relative;
  display: flex;
  align-items: center;
  &.disabled {
    .base-range__slider {
      background: var(--border, #D3D8E6);
      &::-webkit-slider-thumb {
        border: 1px solid var(--border, #D3D8E6);
        &:hover {
          background: var(--white, #fff);
        }
      }
    }
    .progress {
      display: none;
    }
    .tooltip {
      background: var(--border, #D3D8E6);
      svg {
        path {
          fill: var(--border, #D3D8E6)
        }
      }
    }
  }
  &__slider {
    width: 100%;
    height: 8px;
    background: transparent;
    background: var(--light-gray, #EEE);
    outline: none;
    appearance: none;
    transition: opacity .2s;
    margin: 0 !important;
    border-radius: 12px;
    cursor: pointer;

    &::-webkit-slider-thumb {
      position: relative;
      -webkit-appearance: none;
      border: 1px solid var(--primary, #2D2D2D);
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: var(--whie, #fff);
      cursor: pointer; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
      z-index: 5;
      transition: background 0.2s;
      &:hover {
        background: var(--light-gray, #EEE);
      }
    }
  }
  .progress {
    padding-right: 2px;
    top: 0;
    left: 0;
    position: absolute;
    content:'';
    width: 100%;
    height: 8px;
    background-color: var(--primary, #2D2D2D);
    z-index: 0;
    border-radius: 12px 0 0 12px;
    pointer-events: none;
  }
  .tooltip {
    bottom: 22px;
    left: 0;
    position: absolute;
    content: '';
    height: 36px;
    min-width: 74px;
    box-shadow: 0 1px 2px 0 rgba(106, 122, 152, 0.15);
    background-color: var(--primary, #2D2D2D);
    color: var(--white, #FFF);
    z-index: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-after {
      position: absolute;
      bottom: -10px;
      left: calc(50% - 7px);
      z-index: 5;
    }
    &-text {
      font-weight: 400;
      padding: 8px 16px;
      font-size: 14px;
      line-height: 143%;
      text-align: center;
      color: var(--white, #fff);
    }
  }
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
</style>