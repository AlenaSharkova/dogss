<script setup lang="ts">
import {computed, withDefaults} from 'vue';
const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
    defineProps<{
      modelValue: boolean,
      readonly?: boolean,
    }>(), {
      readonly: false
    }
)

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
<template>
  <label class="custom-switch" :class="{ 'custom-switch_active': modelValue, readonly }">
    <input v-model="model" :disabled="readonly" type="checkbox" />
    <div class="custom-switch__bounce"></div>
  </label>
</template>

<style scoped lang="scss">
@use 'sass:map';


.custom-switch {
  $bounce-width: 16px !default;
  $bounce-offset: 6px;
  display: block;
  position: relative;
  width: 52px;
  height: 24px;
  background-color: var(--secondary, #958F9C);
  border-radius: 100px;
  mix-blend-mode: normal;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  min-width: 52px;
  &.readonly {
    background-color: var(--border, #D3D8E6);
  }
  input {
    display: none;
  }
  input:checked ~ .custom-switch__bounce {
    left: 50%;
    left: calc(100% - #{$bounce-width} - #{$bounce-offset});
  }
  input:disabled ~ .custom-switch__bounce {
    opacity: 0.9;
    cursor: default;
  }

  &__bounce {
    position: absolute;
    top: 0;
    bottom: 0;
    left: $bounce-offset;
    margin: auto 0;
    width: $bounce-width;
    height: $bounce-width;
    background-color: var(--white, #fff);
    border-radius: 100rem;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
    transition: all 0.15s ease-in-out;
  }
  &_active {
    background-color: var(--primary, #2D2D2D);
  }
}
</style>
