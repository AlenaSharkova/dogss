<script setup lang="ts">

import {formatFromAmount} from "~/utils/formatData";
import AuthService from "~/service/auth.service";
import {useAuthStore} from "~/stores/auth.store";
import {useUsersStore} from "~/stores/users.store";
import {ruleValidEmail} from "~/utils/commonRules";
import {fa} from "cronstrue/dist/i18n/locales/fa";

const router = useRouter();

const authStore = useAuthStore()

const form = reactive({
  email: {
    value: '',
    valid: false
  },
  phone: '',
  otp: '',
})

const numberStep = ref(0)
const textValidOtp = ref('')
const textInvalidDescr = ref('')
const isLoadSendMail = ref(false)

const prevStep = () => {
  console.log('prevStep',numberStep.value )
  numberStep.value--
}

const nextStep = async () => {
  if(numberStep.value === 0) {
    if(form.email.valid) {
      isLoadSendMail.value = true
      await authStore.sendEmailForLogin(form.email.value)
          .then(() => {
            console.log('success nextStep')
            numberStep.value = 1
          }).catch(err => {
            console.log('err nextStep', err)
            textInvalidDescr.value = err.statusMessage
          }).finally(() => {
            isLoadSendMail.value = false
          })
    }
  }
}
const repeatOtp = () => {
  authStore.sendEmailForLogin(form.email.value)
      .catch(err => {
        textValidOtp.value = err
      })
}
const sendOtp = async (otp: string) => {
  await authStore.getSessionOtp(form.email.value, otp)
  await authStore.getUserData().then(() => {
    router.push('/profile')
  })
}
const onFocusEmail = () => {
  textInvalidDescr.value = ''
}
</script>

<template>
  <div class="auth-login">
    <FormWindow :isPrev="!!numberStep" @prev="prevStep" type="original">
      <template #title>
        Вход
      </template>
      <template #subtitle>
        Если Вы ещё не зарегистрированы на сервисе:
        <router-link to="/auth/registration" class="--link-registration">пройдите регистрацию</router-link>
      </template>
      <template #default>
        <BaseInput
            v-if="numberStep == 0"
            v-model="form.email.value"
            title="Введите почту"
            :invalid-text="textInvalidDescr"
            :rules="[ruleValidEmail]"
            @focus="onFocusEmail"
            @onError="(val: boolean) => (form.email.valid = val)"
        />
        <AuthOtpContent
            v-if="numberStep == 1"
            :email="form.email.value"
            :error-otp-message="textValidOtp"
            @finishOtp="sendOtp"
            @repeatOtp="repeatOtp"
        />
      </template>
      <template #action-buttons>
        <BaseButton
            v-if="numberStep == 0"
            text="Отправить"
            type="teriary"
            @click="nextStep"
            :load="isLoadSendMail"
        />
      </template>
    </FormWindow>
  </div>
</template>

<style scoped lang="scss">
.--link-registration {
  font-weight: 500;
  transition: all 0.5s;
  color: $violet;
  text-align: -webkit-center;
  &::after {
    content: '';
    width: 0px;
    height: 1px;
    display: block;
    transition: 150ms;
    background-color: $violet;
  }
  &:hover::after {
    width: 100%;
  }
}
</style>