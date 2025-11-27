<script setup lang="ts">
import {ref, computed} from 'vue';

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
  type: 'mobile-head' | 'default'
}
const props = withDefaults(defineProps<Props>(), {
  formName: 'input',
  title: "Поиск..",
  maxLength: 200,
  type: 'default',
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
    emits('input');
  } else {
    emits('update:model-value', e.target.value);
    emits('input');

  }
};
const onFocus = (e: FocusEvent) => {
  toggleFocused(true);
  emits('focus', e);
};
const toggleFocused = (value: boolean) => {
  focused.value = value;
}
const onClear = () => {
  emits('update:model-value', '');
}
const fullnessInput = computed(() => {
  if (props.showFullnes && props.modelValue.length > 10) {
    return `${props.modelValue.length} / ${props.maxLength}`;
  } else return ''
})
</script>

<template>
  <div class="base-search">
    <div class="base-search__item" :class="{ invalid: invalidText, focused: focused, '--no-title': !title, disabled: disabled, '--mobile-head': type==='mobile-head'}">
      <input
        :id="props.formName"
        :placeholder="props.title"
        type="text"
        :value="modelValue"
        @blur="onBlur"
        @input="onInput"
        @focus="onFocus"
        :maxlength="maxLength"
        class="base-search"
        :disabled="disabled"
      />
      <div class="base-search__item-icon">
        <BaseIconCommon v-if="type==='mobile-head'" @click="onClear" class="base-search__item-icon--clear" name="clear" />
        <BaseIconCommon v-else class="base-search__item-icon--search" name="search" />
      </div>
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

.base-search {
  width: 100%;
  position: relative;
  &__item {
    display: flex;
    align-items: center;
    color: var(--secondary, #958F9C);
    position: relative;
    padding: 14px 12px;
    border: 1px solid var(--border, #D3D8E6);
    border-radius: 8px;
    min-width: 150px;
    background: var(--white, #fff);
    transition: border .3s;
    line-height: 20px;
    letter-spacing: -0.27px;
    @media (max-width: $lg) {
      padding: 8px 12px;
    }
    @media (max-width: $sm) {
      padding: 12px 8px 11px 8px;
    }
    &.--mobile-head {
      border: none;
      border-bottom: 1px solid var(--secondary, #958F9C);
      background: transparent;
      border-radius: 0;
      &.focused, &:hover {
        border: none;
        border-bottom: 1px solid var(--secondary, #958F9C);
      }
    }
    &.disabled {
      border: 1px solid var(--light-gray, #EEE);
      .label-title {
        color: var(--secondary, #958F9C);
      }
      input {
        color: var(--secondary, #958F9C);
        &::placeholder {
        color: var(--border, #D3D8E6)
        }
      }
      &:hover {
        border: 1px solid var(--light-gray, #EEE);
      }
      .base-search__item-icon {
        &.--
        svg {
          path {
            fill: #D3D8E6;
          }
        }
      }
    }
    &.focused, &:hover {
      border: 1px solid var(--primary, #2D2D2D);
    }

    input {
      margin: 0;
      padding: 0;
      order: 3;
      width: 100%;
      border: 0;
      background-color: transparent;
      transition: all 0.3s;
      color: $violet;
      @include text-normal();
      @media (max-width: $lg) {
        font-size: 14px;
      }
      @media (max-width: $sm) {
        line-height: 143%;
      }
      &::placeholder {
        line-height: 20px;
      }
      &:focus-visible {
        outline: none;
        color: var(--primary, #2D2D2D);
      }
      &:not(:placeholder-shown) ~ .prefix {
        color: var(--primary, #2D2D2D);
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
      color: #7c8b9d;
      position: absolute;
      top: 16px;
      z-index: 2;
      @include text-normal();
      transition: all 0.2s;
      text-wrap: nowrap;
    }
    .label-title.top {
      top: 4px;
      font-size: 11px;
      letter-spacing: 0.12px;
      font-weight: 500;
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
      flex-shrink: 0;
      order: 3;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
      align-self: end;
      margin-left: 5px;
    }
    &-icon {
      cursor: pointer;
      order: 3;
      height: 20px;
      @media (max-width: $sm) {
        height: 14px;
        width: 14px;
      }
      svg {
        height: 100%;
      }
    }
  }
  &__item.invalid {
    border: 1px solid var(--error, #DB1237);
    &.focused {
      border: 1px solid var(--border, #D3D8E6);
    }
  }
}
</style>
