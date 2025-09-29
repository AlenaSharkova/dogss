<script setup lang="ts">
//import OrderService from '~/service/order.service';
import {ref, watch} from 'vue';

const props = defineProps({
  email: {
    type: String,
    default: '',
  },
  errorOtpMessage: {
    type: String,
    default: '',
  },
  errorSecondaryMessage: {
    type: String,
    default: '',
  },
  responseId: {
    type: String || Number,
    default: '',
  },
});

const emit = defineEmits(['finishOtp', 'repeatOtp']);

const config = useRuntimeConfig();
//const OrderConstructor = new OrderService(config.public.apiBaseUrl);

const inputCount = ref(6);
const currentKey = ref(0);
const inputs = ref<string[]>(Array(inputCount.value).fill(''));
const block = ref<HTMLElement | null>(null);
let countSecond = ref(60);
let formatTimer = ref('');
const isShowError = ref(true);
const isErrorSms = ref(false);
const isShowOtpError = ref(false);

const codeResult = computed(() => inputs.value.join(''));

const getChildren = (event: KeyboardEvent & { target: HTMLInputElement }) => {
  return event.target.parentElement?.parentElement?.children;
};

const check = (event: KeyboardEvent & { target: HTMLInputElement }) => {
  const blocks = getChildren(event);
  if (!blocks || currentKey.value < 0 || currentKey.value >= blocks.length) return;

  const inputItem = blocks[currentKey.value].firstChild as HTMLInputElement;
  if (inputItem) {
    inputItem.focus();
  }
};

const inputKeyup = (event: KeyboardEvent & { target: HTMLInputElement }) => {
  if (/\D/.test(event.key) && !['Delete', 'Backspace'].includes(event.key)) {
    return;
  }
  if (currentKey.value > inputCount.value - 1 || currentKey.value < 0) return;
  const blocks = getChildren(event);
  if (!blocks) return;

  if (['Delete', 'Backspace'].includes(event.key)) {
    if(event.target.value !== '') return;
    currentKey.value = Math.max(0, currentKey.value - 1);
    const inputItem = blocks[currentKey.value].firstChild as HTMLInputElement;

    if (inputItem) {
      inputItem.focus();
    }
  } else if (currentKey.value < inputCount.value - 1 && inputs.value[currentKey.value]) {
    currentKey.value = Math.min(inputCount.value - 1, currentKey.value + 1);

    const inputItem = blocks[currentKey.value].firstChild as HTMLInputElement;

    if (inputItem) {
      inputItem.focus();
    }
  }
};
const onInput = (event: InputEvent & { target: HTMLInputElement }) => {
  const target = event.target;
  const inputValue = target.value;

  if (event.data && event.data.replace(/\D/g, '').length > 1) {
    let pasteValue = event.data.replace(/\D/g, '').slice(0, inputCount.value); //Получаем все значения без букв и цифр и обрезаем по макс кол-ву input
    inputs.value = pasteValue.split(''); // Разделяем строку на массив символов
    // Фокус на последний заполненный input
    currentKey.value = Math.min(pasteValue.length - 1, inputCount.value - 1);

    // Если block.value существует и у него есть дети
    if (block.value && block.value.children[currentKey.value]) {
      (block.value.children[currentKey.value].firstChild as HTMLInputElement).focus();
    }
    // Если ввод одного символа
  } else {
    target.value = inputValue.replace(/\D/g, '').substring(0, 1);
    const index = Number(target.tabIndex);
    inputs.value[index] = target.value;
  }
};

const startTimer = async () => {
  let count = 180;
  const intervalResendOtp = setInterval(() => {
    count--;
    countSecond.value = count;

    const remainingSeconds = countSecond.value % 60;
    const minutes = Math.floor((countSecond.value % 3600) / 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    formatTimer.value = `${formattedMinutes}:${formattedSeconds}`;
    if (countSecond.value <= 0) {
      clearInterval(intervalResendOtp);
    }
  }, 1000);
};

const sendOtp = async () => {
  await startTimer();

  if (props.email) {
    emit('repeatOtp')
  } else getErrorSms();
};

const getErrorSms = () => {
  isErrorSms.value = true;
  const t = setTimeout(() => {
    isErrorSms.value = false;
    clearTimeout(t);
  }, 3000);
};
const onPaste = (event: ClipboardEvent) => {
  event.stopPropagation();
  event.preventDefault();

  inputs.value = Array(inputCount.value).fill(null);
  let pasteValue = event.clipboardData?.getData('text').replace(/\D/g, '') || '';
  if (pasteValue) {
    inputs.value.splice(
        0,
        pasteValue.split('').slice(0, inputCount.value).length,
        ...pasteValue.split('').slice(0, inputCount.value),
    );
    const lastItem = inputs.value.findIndex((item) => /\D/.test(item));
    currentKey.value = lastItem === -1 || lastItem === 5 ? inputCount.value - 1 : lastItem;
  } else currentKey.value = 0;
  if (block.value && block.value.children[currentKey.value]?.firstChild) {
    (block.value.children[currentKey.value].firstChild as HTMLInputElement).focus();
  }
};

watch(codeResult, async (newValue) => {
  if (newValue.length >= inputCount.value) {
    emit('finishOtp', codeResult.value);
    isShowOtpError.value = true;
  } else {
    isShowOtpError.value = false;
  }
});

watch(
    () => props.errorSecondaryMessage || props.errorOtpMessage,
    async (newValue) => {
      if (newValue) {
        isShowOtpError.value = true;
        isShowError.value = true;
        const killError = setTimeout(() => {
          isShowError.value = false;
          isShowOtpError.value = true;
          clearTimeout(killError);
        }, 5000);
      } else {
        isShowError.value = true;
        isShowOtpError.value = true;
      }
    },
);
onMounted(() => {
  if (block.value && block.value.children[currentKey.value]?.firstChild) {
    (block.value.children[0].firstChild as HTMLInputElement).focus();
  }
  startTimer();
});
</script>

<template>
  <div class="auth-otp-content">
    <div class="auth-otp-content__head">
      <div class="auth-otp-content__head-descr">
        <span>Отправлен на почту </span>
        <span class="auth-otp-content__head-descr__mail">{{ email }} </span>
      </div>
    </div>
    <div class="auth-otp-content__code">
      <div ref="block" class="auth-otp-content__code-row">
        <div
            v-for="(idp, idx) in inputCount"
            :key="idx"
            class="auth-otp-content__code-block"
            :class="{ '--error-otp': errorOtpMessage && isShowOtpError }">
          <input
              type="number"
              maxlength="1"
              v-model="inputs[idx]"
              @keyup="inputKeyup"
              @input="onInput"
              @focus="check"
              @paste="onPaste"
              :tabindex="idx"
              autocomplete="off"
              :ref="`input_${idx}`"
              onkeypress="if (this.value.length === 1) return false;"
              class="auth-otp-content__code-block__input" />
        </div>
      </div>
      <Transition name="fade" mode="out-in">
        <div v-if="errorOtpMessage && isShowOtpError" class="auth-otp-content__code-error">
          <span> {{ errorOtpMessage }}</span>
        </div>
        <div v-else-if="errorSecondaryMessage && isShowError" class="auth-otp-content__code-error">
          <span> {{ errorSecondaryMessage }} </span>
        </div>
        <div v-else-if="isErrorSms" class="auth-otp-content__code-error">
          <span> Не удалось отправить код </span>
        </div>
      </Transition>
    </div>
    <div class="auth-otp-content__repeat">
      <span v-if="countSecond" class="auth-otp-content__repeat-timer">
        Отправить повторно {{ formatTimer }}
      </span>
      <button v-else @click="sendOtp" class="auth-otp-content__repeat-button">Отправить повторно</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-otp-content {
  &__head {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    @media (max-width: 595px) {
      font-size: 14px;
    }
    &-title {
      color: $dark-text;
    }
    &-descr {
      color: $dark-text;
      &__mail {
        font-style: italic;
      }
    }
  }
  &__code {
    &-row {
      display: flex;
      gap: 16px;
      @media (max-width: $xss) {
        justify-content: space-between;
        gap: 8px;
      }
      @media (max-width: $x4s) {
        gap: 2px;
      }
    }
    &-block {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      width: 64px;
      height: 64px;
      border: 1px solid $violet;
      transition: all 0.3s;
      @media (max-width: $xss) {
        max-width: 64px;
        height: 55px;
        width: 100%;
        min-width: 45px;
      }
      @media (max-width: 380px) {
        height: 50px;
        width: 100%;
        min-width: 35px;
      }
      &.--error-otp {
        border: 1px solid $error-text;
        .auth-otp-content__code-block__input {
          color: $error-text;
        }
      }
      &__input {
        width: 100%;
        height: 100%;
        font-size: 18px;
        font-weight: 400;
        line-height: 22.93px;
        letter-spacing: 0.02em;
        text-align: center;
        transition: all 0.3s;
        border: none;
        border-radius: inherit;

        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
    &-error {
      margin-top: 16px;
      font-size: 14px;
      font-weight: 400;
      line-height: 17.84px;
      letter-spacing: 0.01em;
      color: $error-text;
    }
  }
  &__repeat {
    @include text-normal(400);
    margin-top: 40px;
    color: $dark-text;
    @media (max-width: $xss) {
      margin-top: 16px;
    }
    &-button {
      cursor: pointer;
      @include text-normal(500);
      color: $violet;
    }
  }
}
</style>
