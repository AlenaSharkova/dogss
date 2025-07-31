<template>
  <div class="price-slider">
    <div class="price-input">
      <div class="field">
        <span>Min</span>
        <input type="number"
               class="input-min"
               @input="onInputNumber"
               v-model.number="minPrice"
        />
      </div>
      <div class="separator">-</div>
      <div class="field">
        <span>Max</span>
        <input type="number"
               class="input-max"
               v-model.number="maxPrice" />
      </div>
    </div>
    <div class="slider">
      <div class="progress" :style="progressStyle"></div>
    </div>
    <div class="range-input">
      <input
          type="range"
          class="range-min"
          :min="minValue"
          :max="maxValue"
          v-model.number="rangeMin"
          :step="step"
      />
      <input
          type="range"
          class="range-max"
          :min="minValue"
          :max="maxValue"
          v-model.number="rangeMax"
          :step="step"
      />
    </div>
    <div class="range-descr">
      <div class="range-descr__min">
        <span>{{ formatAmount(minValue, true) }}</span>
      </div>
      <div class="range-descr__max">
        <span>{{ formatAmount(maxValue, true) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
  minValue: {
    type: Number,
    default: 0,
  },
  maxValue: {
    type: Number,
    required: true,
    default: 10000,
  },
  step: {
    type: Number,
    default: 100,
  },
  priceGap: {
    type: Number,
    default: 1000,
  }
});
const minPrice = defineModel<'' | number>('minPrice', {default: 0});
const maxPrice = defineModel<'' | number>('maxPrice', {default: 1000});
const rangeMin = ref<number>(minPrice.value == ''? 0: minPrice.value);
const rangeMax = ref<number>(maxPrice.value == ''? 0: maxPrice.value);

watch(minPrice, (newMinPrice) => {
  if (newMinPrice === '' ) {
    rangeMin.value = 0
    return
  }
  if (newMinPrice > rangeMax.value - props.priceGap) {
    minPrice.value = rangeMax.value - props.priceGap;
  }
  if (newMinPrice < props.minValue ) {
    minPrice.value = props.minValue;
    return
  }
  rangeMin.value = newMinPrice;
});

watch(maxPrice, (newMaxPrice) => {
  if (newMaxPrice === '' ) {
    rangeMax.value = 0
    return
  }
  if (newMaxPrice < rangeMin.value + props.priceGap) {
    maxPrice.value = rangeMin.value + props.priceGap;
  }
  if (newMaxPrice > props.maxValue ) {
    maxPrice.value = props.maxValue;
    return
  }
  rangeMax.value = newMaxPrice;
});

watch(rangeMin, (newRangeMin) => {
  if (newRangeMin > rangeMax.value - props.priceGap) {
    rangeMin.value = rangeMax.value - props.priceGap;
  }
  minPrice.value = newRangeMin;
});
watch(rangeMax, (newRangeMax) => {
  if (newRangeMax < rangeMin.value + props.priceGap) {
    rangeMax.value = rangeMin.value + props.priceGap;
  }
  maxPrice.value = newRangeMax;
});

const progressStyle = computed(() => {
  const left = ((rangeMin.value - props.minValue) / (props.maxValue - props.minValue)) * 100;
  const right = 100 - ((rangeMax.value - props.minValue) / (props.maxValue - props.minValue)) * 100;
  return {
    left: `${left}%`,
    right: `${right}%`,
  };
});

const onInputNumber = (e: InputEvent & { target: HTMLInputElement }) => {
  let res = e.target.value
  if(e.target.value != '0') res = String(Number(e.target.value) || '')
  e.target.value = res.replace(/[^0-9 ]/g, '')
}
</script>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
body{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: $violet;
}
::selection{
  color: #fff;
  background: $violet;
}
.wrapper{
  width: 400px;
  background: #fff;
  border-radius: 10px;
  padding: 20px 25px 40px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.1);
}
header h2{
  font-size: 24px;
  font-weight: 600;
}
header p{
  margin-top: 5px;
  font-size: 16px;
}
.price-input{
  width: 100%;
  display: flex;
  margin: 10px 0 15px;
}
.price-input .field{
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
}
.field input{
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 19px;
  margin-left: 12px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #999;
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.price-input .separator{
  width: 130px;
  display: flex;
  font-size: 19px;
  align-items: center;
  justify-content: center;
}
.slider{
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
}
.slider .progress{
  height: 100%;
  left: 25%;
  right: 25%;
  position: absolute;
  border-radius: 5px;
  background: $violet;

}
.range-input{
  position: relative;
}
.range-input input{
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
input[type="range"]::-webkit-slider-thumb{
  height: 24px;
  width: 10px;
  border-radius: 4px;
  background: $violet;
  cursor: pointer;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
}
input[type="range"]::-moz-range-thumb{
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #17A2B8;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
}

.range-descr {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  &__min, &__max {
    @include subtitle-small(500);
  }
}
</style>
