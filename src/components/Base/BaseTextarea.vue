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
  password?: boolean;
  showFullnes?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  formName: 'input',
})

const isShowPassword = ref(false);
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
const actionPassword = () => {
  isShowPassword.value = !isShowPassword.value
};
const onFocus = (e: FocusEvent) => {
  toggleFocused(true);
  emits('focus', e);
};
const toggleFocused = (value: boolean) => {
  focused.value = value;
};
const typeInput = computed(() => {
  if (props.password) {
    return isShowPassword.value? 'text': 'password';
  } else return 'text'
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
      <div
        class="base-textarea__item-visibility"
        v-if="password && modelValue"
        @click="actionPassword()" >
        <div v-if="isShowPassword" class="base-textarea__item-visibility__icon --show">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z" fill="#958F9C"/>
          </svg>
        </div>
        <div v-else class="base-textarea__item-visibility__icon --hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clip-path="url(#clip0_289_12795)">
              <path d="M12 6.49999C14.76 6.49999 17 8.73999 17 11.5C17 12.01 16.9 12.5 16.76 12.96L19.82 16.02C21.21 14.79 22.31 13.25 23 11.49C21.27 7.10999 17 3.99999 12 3.99999C10.73 3.99999 9.51 4.19999 8.36 4.56999L10.53 6.73999C11 6.59999 11.49 6.49999 12 6.49999ZM2.71 3.15999C2.32 3.54999 2.32 4.17999 2.71 4.56999L4.68 6.53999C3.06 7.82999 1.77 9.52999 1 11.5C2.73 15.89 7 19 12 19C13.52 19 14.97 18.7 16.31 18.18L19.03 20.9C19.42 21.29 20.05 21.29 20.44 20.9C20.83 20.51 20.83 19.88 20.44 19.49L4.13 3.15999C3.74 2.76999 3.1 2.76999 2.71 3.15999ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 10.73 7.18 9.99999 7.49 9.35999L9.06 10.93C9.03 11.11 9 11.3 9 11.5C9 13.16 10.34 14.5 12 14.5C12.2 14.5 12.38 14.47 12.57 14.43L14.14 16C13.49 16.32 12.77 16.5 12 16.5ZM14.97 11.17C14.82 9.76999 13.72 8.67999 12.33 8.52999L14.97 11.17Z" fill="#958F9C"/>
            </g>
            <defs>
              <clipPath id="clip0_289_12795">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>

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


.base-textarea {
  width: 100%;
  position: relative;
  &__item {
    display: flex;
    align-items: center;
    color: var(--secondary, #958F9C);
    position: relative;
    padding: 21px 12px 7px;
    border: 1px solid var(--border, #D3D8E6);
    border-radius: 8px;
    min-width: 150px;
    background: var(--white, #fff);
    transition: border .3s;
    line-height: 22px;
    letter-spacing: -0.27px;
    &.--no-title {
      padding: 10px;
    }
    &.disabled {
      border: 1px solid var(--light-gray, #EEE);
      background: var(--light-gray, #EEE);
      .label-title {
        color: var(--secondary, #958F9C);
      }
      textarea {
        color: var(--secondary, #958F9C);
      }
    }
    &.focused {
      border: 1px solid var(--primary, #2D2D2D);
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
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        width: 20px;
      }
      &::-webkit-scrollbar-thumb {
        background: var(--border, #D3D8E6);
        border-radius: 4px;
      }
      &::placeholder {
        color: transparent;
      }
      &:focus-visible {
        height: 60px;
        outline: none;
        color: var(--primary, #2D2D2D);
      }
      &:not(:placeholder-shown) {
        height: 60px;
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
      color: #DB1237;
      font-weight: 500;
      transition: all 0.2s;

    }
    .label-fullness {
      position: absolute;
      right: 10px;
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
    border: 1px solid var(--error, #DB1237);
    &.focused {
      border: 1px solid var(--border, #D3D8E6);
    }
  }
}
</style>
