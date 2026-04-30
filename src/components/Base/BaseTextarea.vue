<script setup lang="ts">
import {ref, PropType, computed} from 'vue';

const emits = defineEmits([
  'update:model-value',
  'input',
  'change',
  'focus',
  'blur',
  'paste',
  'chooseAutocomplete',
]);
interface Props {
  formName?: string;
  modelValue: string;
  title?: string;
  invalidText?: string;
  maxLength?: number;
  totalNumber?: boolean;
  disabled?: boolean;
  showFullnes?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  formName: 'input',
})

const focused = ref(false);

const onBlur = (e: InputEvent & { target: HTMLInputElement }) => {
  toggleFocused(false);
  emits('blur', e.target.value);
};
const onInput = (e: InputEvent & { target: HTMLInputElement }) => {
  if (props.totalNumber) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    emits('update:model-value', e.target.value);
  } else {
    emits('update:model-value', e.target.value);
  }
};
const onFocus = (e: FocusEvent) => {
  toggleFocused(true);
  emits('focus', e);
};
const toggleFocused = (value: boolean) => {
  focused.value = value;
};
const typeInput = computed(() => {
  return 'text'
})
const fullnessInput = computed(() => {
  console.log('props.showFullnes', props.showFullnes)
  if (props.showFullnes && props.modelValue.length > 10 && props.maxLength) {
    return `${props.modelValue.length} / ${props.maxLength}`;
  } else return ''
})
</script>

<template>
  <div class="base-textarea">
    <div class="base-textarea__item" :class="{ invalid: invalidText, focused: focused, '--no-title': !title, disabled: disabled}">
      <textarea
        :id="props.formName"
        placeholder=""
        :type="typeInput"
        :value="modelValue"
        @blur="onBlur"
        @input="onInput"
        @focus="onFocus"
        :maxlength="maxLength"
        class="base-textarea"
        :disabled="disabled"
      />

      <label v-if="title" class="label-title" :for="formName">
        {{ title }}
      </label>
      <label v-if="fullnessInput" class="label-fullness">
        {{ fullnessInput }}
      </label>
      <label v-if="invalidText" class="label-invalid" :for="formName">
        {{ invalidText }}
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';


.base-textarea {
  width: 100%;
  position: relative;
  &__item {
    display: flex;
    align-items: center;
    color: $dark-text;
    position: relative;
    padding: 21px 12px 7px;
    border: 1px solid $violet-opacity-max;
    border-radius: 8px;
    min-width: 150px;
    background: $white-background;
    transition: border .3s;
    line-height: 22px;
    letter-spacing: -0.27px;
    &.--no-title {
      padding: 10px;
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.6;
    }
    &.focused {
      border: 1px solid $violet;
    }

    textarea {
      margin: 0;
      padding: 0 40px 0 0;
      order: 3;
      min-width: 100px;
      width: 100%;
      border: 0;
      background-color: transparent;
      transition: all 0.3s;
      @include text-normal();
      font-family: "Montserrat", sans-serif;
      height: 22px;
      resize: none;

      white-space: pre-wrap;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        width: 20px;
      }
      &::-webkit-scrollbar-thumb {
        background: $violet-opacity;
        border-radius: 4px;
      }
      &::placeholder {
        color: transparent;
      }
      &:focus-visible {
        height: 60px;
        outline: none;
      }
      &:not(:placeholder-shown) {
        height: 60px;
      }
      &:focus ~ .label-title,
      &:not(:placeholder-shown) ~ .label-title {
        top: 4px;
        font-size: 11px;
        letter-spacing: 0.12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      &:focus ~ .label-invalid {
        opacity: 0;
        transition: none;
        top: 40px;
      }
    }
    .label-title {
      left: 12px;
      pointer-events: none;
      color: $grey-violet;
      position: absolute;
      top: 16px;
      z-index: 2;
      @include text-normal();
      transition: all 0.2s;
      &.top {
        top: 4px;
        font-size: 11px;
        letter-spacing: 0.12px;
        font-weight: 500;
      }
    }
    .label-invalid {
      display: block;
      pointer-events: none;
      position: absolute;
      top: 50px;
      left: 0;
      font-size: 12px;
      line-height: 12px;
      color: $error-text;
      font-weight: 500;
      transition: all 0.2s;

    }
    .label-fullness {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 1;
      background-color: rgba(256, 256, 256, 0.4);
      flex-shrink: 0;
      order: 3;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
      align-self: end;
      margin-left: 5px;
      color: $grey-violet;
    }
    &-visibility {
      order: 3;
      cursor: pointer;
      transition: all 0.3s;
      height: 22px;
      svg {
        height: 22px;
      }
    }
  }
  &__item.invalid {
    border: 1px solid $error-border;
    &.focused {
      border: 1px solid $violet;
    }
  }
}
</style>
