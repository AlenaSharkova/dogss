<script setup lang="ts">

import {formatFromAmount} from "~/utils/formatData";
import AuthService from "~/service/auth.service";
import {useAuthStore} from "~/stores/auth.store";
import {useUsersStore} from "~/stores/users.store";
import {ruleNotEmpty, ruleRegions, ruleValidEmail} from "~/utils/commonRules";
import {fa} from "cronstrue/dist/i18n/locales/fa";
import {computed, ref} from "vue";
import type {ISelectNumber} from "~/struct/Common/ISelectComponent";
import BaseModal from "~/components/Base/BaseModal.vue";

const authStore = useAuthStore()
const regionsStore = useRegionsStore()
const router = useRouter();

const form = reactive({
  email: {
    value: '',
    valid: false
  },
  last_name: {
    value: '',
    valid: false
  },
  first_name: {
    value: '',
    valid: false
  },
  phone: {
    value: '',
    valid: false
  },
  region: {
    value: '',
  },
  city: {
    value: '',
  },
  otp: '',
})
const selectRegion = ref<ISelectNumber>( {})
const selectCity = ref<ISelectNumber>({})

const currentStep = ref(1)
const textInvalidOtp = ref('')
const textInvalidOtpUnconfirmed = ref('')
const textInvalidDescr = ref('')
const isLoadSendMail = ref(false)
const isErrorSelectedRegion = ref(false)
const isUnconfirmedUser = ref(false)
const agreeConfirmUser = ref(false)

const regionsList = computed(() => regionsStore.regionsList)
const cityList = computed(() => regionsStore.cityList || [])

const widthProgress = computed(() => {
  return (currentStep.value * 25) + '%'
})
const titleStep = computed(() => {
  if(currentStep.value === 1) return 'Данные для входа'
  if(currentStep.value === 2) return 'Личные данные'
  if(currentStep.value === 3) return 'Гео данные'
  if(currentStep.value === 4) return 'Подтверждение почты'
})
const disabledButton = computed(() => {
  if(currentStep.value === 1) return !form.email.valid
  if(currentStep.value === 2) return !(form.last_name.valid && form.first_name.valid && form.phone.valid)
  if(currentStep.value === 3) return !selectCity.value?.value
})

const showErrorSelectedRegion = () => {
  isErrorSelectedRegion.value = true
}
const onFocusEmail = () => {
  textInvalidDescr.value = ''
}
const prevStep = () => {
  currentStep.value--
}
const nextStep = async () => {
  if(currentStep.value == 1) await checkEmailAvailability()
  else if(currentStep.value === 2) currentStep.value++
  else if(currentStep.value === 3) await registrationUser()
}
const repeatOtp = async () => {
  await authStore.checkEmailAvailability(form.email.value).then((res => {
    if (res?.isAvailability) {
      if (res?.userStatus === 'unconfirmed') {
        confirmUser()
      } else {
        textInvalidDescr.value = 'Пользователь уже зарегистрирован на сервисе'
      }
    } else {
      registrationUser()
    }
  }))
}
const sendOtp = async (otp: string) => {
  await authStore.getSessionTokenWitchOtp(form.email.value, otp)
      .then(async res => {
        if (res?.token) {
          console.log('res?.token', res?.token)
          //await authStore.getUserFullData()
          await router.push('/profile')
        } else textInvalidOtp.value = 'Ошибка авторизации'
      })
      .catch(e => {
        if(e && (e.statusCode == 401 || e.statusCode == 400)) {
          textInvalidOtp.value = e.statusMessage
        }
      })

}
const closeModal = () => {
  isUnconfirmedUser.value = false
}
const checkEmailAvailability = async () => {
  await authStore.checkEmailAvailability(form.email.value).then((res => {
    if(res?.isAvailability) {
      if(res?.userStatus === 'unconfirmed') {
        isUnconfirmedUser.value = true
      } else {
        textInvalidDescr.value = 'Пользователь уже зарегистрирован на сервисе'
      }
    } else {
      currentStep.value++
    }
  }))
}
const registrationUser = async () => {
  if (form.email.valid && form.last_name.valid && form.first_name.valid && form.phone.valid
      && selectRegion.value.value && selectCity.value.value) {
    isLoadSendMail.value = true
    await authStore.sendEmailForRegistration({
      email: form.email.value,
      last_name: form.last_name.value,
      first_name: form.first_name.value,
      phone: form.phone.value,
      region: selectRegion.value.value,
      city: selectCity.value.value,
    })
        .then(() => {
          currentStep.value = 4
        }).catch(err => {
          //textInvalidDescr.value = err.statusMessage
        }).finally(() => {
          isLoadSendMail.value = false
        })
  }
}
const requestConfirm = async () => {
  agreeConfirmUser.value = true
  await confirmUser().then((res) => {
    agreeConfirmUser.value = true
  })
}
const backRequestConfirm = () => {
  agreeConfirmUser.value = false
}
const confirmUser = async () => {
  return authStore.sendEmailForConfirm(form.email.value)
      .catch(err => {
        textInvalidOtpUnconfirmed.value = err
      })
}

watch(() => selectRegion.value,
    (newRegion) => {
      selectCity.value = {}
      if(newRegion?.value) regionsStore.getCityList(newRegion.value)
    }
)

if(!regionsStore.regionsList) {
  regionsStore.updateRegionsList()
}
</script>

<template>
  <div class="auth-registration">
    <FormWindow
        :is-prev="currentStep !== 1 && currentStep !== 4"
        type="original"
        @prev="prevStep"
    >
      <template #title>
        Регистрация
      </template>
      <template #subtitle>
        <div class="auth-registration__progress">
          <div class="auth-registration__progress-content">
            <span class="auth-registration__progress-content__step">
              Шаг {{ currentStep }} из 4
            </span>
            <span class="auth-registration__progress-content__title">
              {{ titleStep }}
            </span>
          </div>
          <div class="auth-registration__progressbar">
            <div
                class="auth-registration__progressbar-line"
                :style="{width: widthProgress}"
            >
            </div>
          </div>
        </div>
        <span>Если Вы уже зарегистрированы на сервисе: </span>
        <router-link to="/auth/login" class="--link-registration">перейдите к странице входа</router-link>

      </template>
      <template #default>
        <template v-if="currentStep == 1">
          <BaseInput
              v-model="form.email.value"
              title="Введите почту"
              form-name="email"
              :invalid-text="textInvalidDescr"
              :rules="[ruleValidEmail, ruleNotEmpty]"
              :max-length="254"
              @focus="onFocusEmail"
              @onError="(val: boolean) => (form.email.valid = val)"
          />
        </template>
        <template v-if="currentStep == 2">
          <BaseInput
              v-model="form.first_name.value"
              form-name="first_name"
              title="Введите имя"
              :max-length="30"
              :rules="[ruleNotEmpty]"
              @onError="(val: boolean) => (form.first_name.valid = val)"
          />
          <BaseInput
              v-model="form.last_name.value"
              form-name="last_name"
              title="Введите фамилию"
              :rules="[ruleNotEmpty]"
              :max-length="64"
              @onError="(val: boolean) => (form.last_name.valid = val)"
          />
          <BaseInput
              v-model="form.phone.value"
              title="Введите номер телефона"
              type="tel"
              form-name="phone"
              :rules="[ruleValidNumberPhone]"
              mask="+7 (___) ___ __-__"
              @onError="(val: boolean) => (form.phone.valid = val)"
          />
        </template>
        <template v-if="currentStep == 3">
          <BaseSelect
              v-if="regionsList?.length"
              :items="regionsList"
              :show-error="isErrorSelectedRegion"
              :rules="[ruleRegions]"
              v-model="selectRegion"
              show-search
              name="ad-region"
              full-value
              placeholder="Выберите регион"
          />
          <BaseSelect
              :disable="!selectRegion?.value"
              :items="cityList"
              v-model="selectCity"
              show-search
              name="ad-city"
              full-value
              placeholder="Выберите город"
              @click="showErrorSelectedRegion"
          />

        </template>
        <template v-if="currentStep == 4">
          <AuthOtpContent
              :email="form.email.value"
              :error-otp-message="textInvalidOtp"
              @finishOtp="sendOtp"
              @repeatOtp="repeatOtp"
          />
        </template>
      </template>
      <template #action-buttons>
        <BaseButton
            v-if="currentStep !== 4"
            :disabled="disabledButton"
            text="Дальше"
            type="teriary"
            @click="nextStep"
            :load="isLoadSendMail"
        />
      </template>
    </FormWindow>
    <BaseModal :isShowModal="isUnconfirmedUser" @close="closeModal">
      <FormWindow
          :is-prev="agreeConfirmUser"
          @prev="backRequestConfirm"
      >
        <template #title>
          Подтверждение почты
        </template>
        <template #subtitle>
          Вы уже регистрировались в системе, требуется подтвердить почту
        </template>
        <AuthOtpContent
            v-if="agreeConfirmUser"
            :email="form.email.value"
            :error-otp-message="textInvalidOtpUnconfirmed"
            @finishOtp="sendOtp"
            @repeatOtp="confirmUser"
        />
        <template #action-buttons>
          <BaseButton
              v-if="!agreeConfirmUser"
              :text="`Подтвердить почту ${form.email.value}`"
              @click="requestConfirm" />
        </template>
      </FormWindow>
    </BaseModal>
  </div>
</template>

<style scoped lang="scss">
.auth-registration {
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
  &__progress {
    margin: 20px 0;
    &-content {
      display: grid;
      padding-bottom: 10px;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: end;
      &__step {
        text-align: start;
        @include text-normal(500);
      }
      &__title {
        @include h6;
      }
    }
  }
  &__progressbar {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: $light-teal;
    background: $violet;
    background: $violet-opacity;
    background: #f4f4f4ff;
    //background: #B2E1DA99;
    position: relative;
    overflow: hidden;
    &-line {
      position: absolute;
      left: 0;
      //background: $light-teal;

      background: $light-teal;
      background: $violet;

      //background: $yellow;

      top: 0;
      bottom: 0;
      z-index: 0;
      border-radius: 2px;
      transition: width 0.7s;
    }
  }
  &__form {
    &-title {
      @include h6;
    }
  }
}

</style>