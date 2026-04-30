<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {formatAmountInput} from "@/utils/formatData";

const emits = defineEmits([
  'update:model-value',
  'input',
  'change',
  'focus',
  'blur',
  'paste',
  'chooseAutocomplete',
  'onError'
]);
interface Props {
  formName?: string;
  modelValue: string;
  title?: string;
  placeholder?: string;
  invalidText?: string;
  maxLength?: number;
  totalNumber?: boolean;
  totalNumberMask?: boolean;
  disabled?: boolean;
  password?: boolean;
  showFullnes?: boolean;
  prefix?: string;
  mask?: string;
  validCharacters?: string;
  styleAmount?: boolean;
  replaceForData?: boolean;
  postfix?: string;
  invalidSend?: boolean;

  rules?: any[]
  type?: string;
  errorBackground?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errorBackground: false,
  totalNumberMask: false
})

const isShowPassword = ref(false);
const focused = ref(false);
const isDisabledInvalidText = ref(false)
const errorCustomer = ref('')

const checkRules = (showError?: boolean) => {
  if (props.rules) {
    errorCustomer.value = "";
    for (const rule of props.rules) {
      const ruleResult = rule(props.modelValue);
      if (ruleResult) {
        errorCustomer.value = showError ? ruleResult : "";
        emits("onError", false);
        return;
      }
    }
    emits("onError", true);
  }
};
const onBlur = (e: InputEvent & { target: HTMLInputElement }) => {
  toggleFocused(false);
  emits('blur', e.target.value);
};
const onInput = (e: InputEvent & { target: HTMLInputElement }) => {
  console.log('onInput e.inputType00', e.inputType, e.target.selectionStart)
  if (props.totalNumber) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }
  if(props.postfix) {
    e.target.value = e.target.value + props.postfix
    e.target.setSelectionRange(e.target.value.length-props.postfix.length, e.target.value.length-props.postfix.length,)
  }
  console.log('onInput1 e.inputType00', e.inputType, e.target.selectionStart)
  if(props.mask) {
    let res = formMask(e.target.value, false, e)
    e.target.value = res.value
    if (e.inputType == 'insertText' || e.inputType == 'deleteContentBackward') {
      e.target.selectionStart = res.position || 0;
      e.target.selectionEnd = res.position || 0;
    }
  }
  if(props.validCharacters) {
    const re = new RegExp(`[^${props.validCharacters}]`, 'g')
    console.log(re, e.target.value.replace(re, ''))
    e.target.value = e.target.value.replace(re, '');
  }
  if(props.styleAmount) {
    e.target.value = e.target.value.replace(/[^0-9.,]/g, '')
    e.target.value = e.target.value.replace(/,/g, ".");
    if (e.target.value ) {
      if ( (e.target.value.split('.')[1] || '').length > 2 ) {
        e.target.value = e.target.value.slice(0, -1);
      }
      if( (e.target.value.match(/\./g) || '').length > 1) {
        e.target.value = e.target.value.substr(0, e.target.value.lastIndexOf("."));
        console.log(e.target.value, e.target.value.slice(0, -1) )
      }
      if ( e.target.value.slice(-1) == '.') {
        e.target.value = formatAmountInput(e.target.value.slice(0, -1)) + ','
      } else if ( e.target.value.slice(-2) == '.0') {
        e.target.value = formatAmountInput(e.target.value.slice(0, -2)) + ',0'
      } else if ( e.target.value.slice(-3) == '.00') {
        e.target.value = formatAmountInput(e.target.value.slice(0, -2)) + ',00'
      }
      else  {
        e.target.value = formatAmountInput(e.target.value)
      }
    }
  }
  if(props.replaceForData) {
    let value = e.target.value?.split('')
    console.log('replaceForData', value)

    //const valueNumber = value.replace(/[^0-9]/g, '')
    value[0] = value[0]?.replace(/[^0-3]/g, '') || ''
    console.log('replaceForData 0', value)

    value[1] = value[0] === '3'
        ? value[1]?.replace(/[^0-1]/g, '') || ''
        : (value[0] === '0'? value[1]?.replace(/[^1-9]/g, '') || '': value[1]?.replace(/[^0-9]/g, '') || '')
    console.log('replaceForData 1', value)

    value[2] = value[2] || ''
    value[3] = value[3]?.replace(/[^0-1]/g, '') || ''
    value[4] = value[3] === '1'? value[4]?.replace(/[^0-2]/g, ''): value[4]?.replace(/[^1-9]/g, '') || ''
    console.log('replaceForData 4', value)

    value[5] = value[5] || ''
    value[6] = value[6]?.replace(/[^1-2]/g, '') || ''
    value[7] = value[6] === '1'? value[7]?.replace(/[^9]/g, '') || '': value[7]?.replace(/[^0]/g, '') || ''
    value[8] = value[6] === '2'? value[8]?.replace(/[^0-2]/g, '') || '': value[8]?.replace(/[^9]/g, '') || ''
    value[9] = value[9]?.replace(/[^0-9]/g, '') || ''
    e.target.value = value.join('')

  }
  emits('update:model-value', e.target.value);
  emits('input', e.target.value);
};
const actionPassword = () => {
  isShowPassword.value = !isShowPassword.value
};
const onFocus = (e: FocusEvent & { target: HTMLInputElement }) => {
  toggleFocused(true);
  if(props.mask) {
    const res = formMask(e.target.value, true)
    if(props.mask) {
      emits('update:model-value', res.value);
      emits('input', res.value);
    }
  }
  emits('focus', e);
};
const toggleFocused = (value: boolean) => {
  focused.value = value;
  isDisabledInvalidText.value = !!(props.invalidText && props.invalidSend)
};
const typeInput = computed(() => {
  if (props.password) {
    return isShowPassword.value? props.type: 'password';
  } else return props.type
})
const fullnessInput = computed(() => {
  if (props.showFullnes && props.modelValue.length > 10) {
    return `${props.modelValue.length} / ${props.maxLength}`;
  } else return ''
})
const generateMask = () => {
  const regex = /([*])\((\d+)\)/g; // Находим символы '_' или '*' в скобках с числом
  return props.mask?.replace(regex, (match, char, count) => {
    return char.repeat(parseInt(count, 10)); // Повторяем символ указанное количество раз
  }) || '';
}

const onKeyDown = (e: KeyboardEvent & { target: HTMLInputElement }) => {
  if(props.mask) {
    let matrix = generateMask()
    const beforeCustomer = matrix.split('*')[0]
    const beforeSpace = matrix.split(' ')[0]
    let positionStart = e.target.selectionStart as number;
    let positionEnd = e.target.selectionEnd as number;

    let beforeSymbolMask = beforeCustomer.length < beforeSpace.length? beforeCustomer: beforeSpace
    console.log('beforeSymbolMask', e, beforeSymbolMask, beforeCustomer, beforeSpace)
    if (positionStart < beforeSymbolMask.length && (e.keyCode == 37 || e.keyCode == 0)) {
      /*val = val.substring(1) + val[0];
      if (val === 'undefined') {
        val = '';
      }
      position = 5;*/
      e.target.selectionStart = beforeSymbolMask.length + 1
      e.target.selectionEnd = beforeSymbolMask.length + 1
      //e.preventDefault();

    }
    /*if(e.keyCode == 37 || e.keyCode == 39)
      e.preventDefault();*/
  }
}
const formMask = (value: string, isFocus = false, e?: InputEvent & { target: HTMLInputElement } ) => {
  let matrix_def = generateMask()
  let matrix = matrix_def;
  let i = 0;

  const beforeCustomer = matrix.split('*')[0]
  const beforeSpace = matrix.split(' ')[0]
  let beforeSymbolMask = beforeCustomer.length < beforeSpace.length? beforeCustomer: beforeSpace
  console.log('beforeSymbolMask00', beforeSymbolMask)

  let positionDefaultSymbol = 0
  let textBefore = ''
  let position = 0;
  if(e && !isFocus) {
    position = (e.target.selectionStart as number) < beforeSymbolMask.length? beforeSymbolMask.length: (e.target.selectionStart as number) ;
    textBefore = value.substr(0, position);
    positionDefaultSymbol = position - textBefore.replace(/\w/g, '').length;
    console.log('e.inputType00', e.inputType, position)

  }
  //let def = beforeCustomer.length < beforeSpace.length? beforeCustomer: beforeSpace
  //let def = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
  if(props.totalNumberMask) {

  }
  let val = props.totalNumberMask?
      value.replace(/[\D]/g, ''):
      value.replace(/[^a-zA-Z0-9_/:.@]/g, '')

  console.log('eeeee', e, value)

  if(isFocus) {
    let def = beforeCustomer.length < beforeSpace.length? beforeCustomer: beforeSpace

    if (def.length >= val.length) {
      //i = val.length
      value = def;
      console.log('value', value)
      return {value, position};
    }
  } else  {
    let def = props.totalNumberMask?
        matrix.replace(/[\D]/g, ''):
        matrix.replace(/[^a-zA-Z0-9_/:.@]/g, '')

    if (def.length >= val.length) {
      val = def;
    }
    /*if (val.length > 0 && val[0] !== '7') {
      val = '7' + val.substring(1);
    }
    if (val.length === 0) {
      val = '7';
    }*/

    console.log('def 0', val,  def)
    let forSlice = props.totalNumberMask?
        matrix.replace(/[^0-9_*]/g, ''):
        matrix.replace(/[^a-zA-Z0-9_*/:.]/g, '')

    val = val.slice(0, forSlice.length)
    console.log('def 1', val,  def)


    value = matrix.replace(/./g, (a, index) => {
      console.log(i, value, val.length, val, a, /[*]/.test(a), beforeSymbolMask.length)
      const forTest = props.totalNumberMask?
          /[0-9_]/g.test(a):
          /[a-zA-Z0-9_/:.@]/g.test(a)

      if (i >= val.length ) return '';
      else if (/[*]/.test(a)) {
        return val.charAt(i++);
      } else if (forTest) {
        i++
        return a;
      } else {
        //i++
        if(e) {
          console.log(i, positionDefaultSymbol, position, index)

          if (positionDefaultSymbol > i  && position - index < 2 && e.inputType == 'insertText') {
            (position as number)++;
          } else if (
              positionDefaultSymbol == i
              && (position as number) - index > 1
              && e.inputType == 'deleteContentBackward'
          ) {
            (position as number)--;
          }
        }
        return a;
      }

    });

    // Ensure the cursor position is always after '+7'
    /*if (position < 3) {
      position = 3;
    }*/

    if(e) {
      console.log('e.inputType', e.inputType, position)
      if (e.inputType == 'insertText' || e.inputType == 'deleteContentBackward') {
        e.target.selectionStart = position || 0;
        e.target.selectionEnd = position || 0;
      }
    }

    console.log('def', val,  i, value)

    /*value = matrix.replace(/./g, (a) => {
      return /[\w^*]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });*/
    return {value, position};

  }

};
watch(() => props.modelValue,  () => {
  checkRules(true);
  //formMask(props.modelValue)
})
watch(
    () => props.invalidText,
    (newValue) => {
      if (newValue) {
        isDisabledInvalidText.value = false
      }
    }
)
onMounted(() => {
  const res = formMask(props.modelValue)
  if(props.mask) {
    emits('update:model-value', res.value);
    emits('input', res.value);

  }

})

</script>

<template>
  <div class="base-field" @click.stop>
    <div class="base-field__item" :class="{ invalid: invalidText && !isDisabledInvalidText || errorCustomer, focused: focused, '--no-title': !title, disabled: disabled}">
      <input
        :id="formName"
        :placeholder="placeholder || ''"
        :type="typeInput"
        :value="modelValue"
        :maxlength="maxLength"
        class="base-input"
        :disabled="disabled"
        @blur="onBlur"
        @keydown="onKeyDown"
        @input="onInput"
        @focus="onFocus"
      />
      <label v-if="title" class="label-title" :for="formName">
        {{ title }}
      </label>
      <label v-if="prefix" class="prefix" :for="formName">
        {{ prefix }}
      </label>
      <div
        class="base-field__item-visibility"
        v-if="password && modelValue"
        @click="actionPassword()">
        <div v-if="isShowPassword" class="base-field__item-visibility__icon --show">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z" fill="#958F9C"/>
          </svg>
        </div>
        <div v-else class="base-field__item-visibility__icon --hidden">
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
      <Transition name="invalid">
        <label v-if="invalidText && !isDisabledInvalidText && !focused" class="label-invalid" :for="formName">
          {{ invalidText }}
        </label>
      </Transition>
      <Transition name="invalid">
        <label v-if="errorCustomer && !focused" class="label-invalid" :class="{'--error-background': errorBackground}" :for="formName">
          {{ errorCustomer }}
        </label>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';


.base-field {
  width: 100%;
  position: relative;
  padding-bottom: 20px;

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

    box-shadow: 3px 4px 8px 0px #0d275040 inset,-4px -3px 10px 0px #fff inset;;

    &.--no-title {
      padding: 10px;
    }
    .postfix {
      order: 4;
    }
    &.disabled {
      border: 1px solid $violet-opacity-max;
      background: $white-background;
      .label-title {
        color: $grey-violet;
      }
      input {
        color: $dark-text;
      }
    }
    &:hover {
      border: 1px solid $violet;
    }
    &.focused {
      //border: 1px solid  darken($light-teal, 8%);
      border: 1px solid $violet;
      //border: 1px solid #9FB4B2;
      //box-shadow: $box-shadow-lite;
      .label-invalid {

        //display: none;
        /*opacity: 0;
        transition: none;
        top: 40px;*/
      }
    }

    input {
      margin: 0;
      padding: 0;
      order: 3;
      width: 100%;
      border: 0;
      background-color: transparent;
      transition: all 0.3s;
      @include text-normal();
      color: $dark-text;
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        box-shadow: inset 20px 20px 0 20px $white-text;
        background: $white-text;
      }
      &::placeholder {
        color: $grey-lite;
        transition: color 0.2s;
        font-family: "Montserrat", sans-serif;
      }
      &:focus-visible {
        outline: none;
      }
      &:not(:focus)::placeholder {
        color: transparent;
      }
      &:focus ~ .prefix,
      &:not(:placeholder-shown) ~ .prefix {
        display: block;
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
      /*&:focus ~ .label-invalid {
        opacity: 0;
        transition: none;
        top: 40px;
      }*/
    }
    .prefix {
      display: none;
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
      //color: #DB1237;
      color: $error-text;
      font-weight: 500;
      animation: anim-invalid 0.2s;
      //transition: opacity 0.2s, top 0.2s;
      &.--error-background {
        border-radius: 3px;
        background-color: $error;

        color: $white-text;
        padding: 2px 5px;
      }
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
    border: 1px solid $error-text;
    &.focused {
      border: 1px solid $violet-opacity-max;
    }
  }
}
@keyframes anim-invalid {
  0% {
    opacity: 0;
    top: 40px;
  }
  100% {
    top: 50px;
    opacity: 1;
  }
}
.invalid-leave-active, .invalid-enter-active {
  transition: all 0.2s;
}
.invalid-enter-from, .invalid-leave-to {
  opacity: 0;
  top: 40px!important;
}
.invalid-enter-to, .invalid-leave-from  {
  top: 50px;
  opacity: 1;
}
</style>
