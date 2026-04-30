<script setup lang="ts">

import {computed, type PropType, ref} from 'vue';
import type {
  UserChangeItemStruct, UserContactMethodsFormItemStruct, UserContactMethodsStruct,
  UserCreateItemStruct,
  UserFormItemStruct,
  UserItemFullStruct
} from "~/struct/User/UserItemStruct";
import type {ICommonFormValid} from "~/struct/Common/ICommonForm";
import {ruleNotEmpty, ruleRegions, ruleValidEmail} from "~/utils/commonRules";
import type {ISelectNumber} from "~/struct/Common/ISelectComponent";
import {usePersonalAdStore} from "~/stores/personal-ad.store";
import BaseWrapperIconBlur from "~/components/Base/BaseWrapperIconBlur.vue";
import BaseModal from "~/components/Base/BaseModal.vue";
import {useAuthStore} from "~/stores/auth.store";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemFullStruct>,
    required: true,
  }
})
defineEmits(['close'])

const regionsStore = useRegionsStore()
const personalAdStore = usePersonalAdStore()
const personalStore = usePersonalStore()
const authStore = useAuthStore()

const form = ref<UserFormItemStruct>({
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
  region: {},
  city: {},
  contact_methods: {}
})
const formDefault = ref<UserFormItemStruct>(form.value)
const isErrorSelectedRegion = ref(false)
const isShowEditEmail = ref(false)
const textInvalidOtpUnconfirmed = ref('')
const agreeConfirmUser = ref(false)

const regionsList = computed(() => regionsStore.regionsList)
const cityList = computed(() => regionsStore.cityList || [])
const isEmptyContacts = computed(() => !Object?.getOwnPropertyNames(formDefault.value.contact_methods || {}).length && !Object.getOwnPropertyNames(form.value.contact_methods || {}).length)

const getFieldsForm = () => {
  const data = props.user
  return {
    last_name: {
      value: data.personal_data.last_name,
      valid: true
    },
    first_name: {
      value:data.personal_data.first_name,
      valid: true
    },
    email: {
      value:data.personal_data.email,
      valid: true
    },
    region: data.personal_data.geo_main.region,
    city: data.personal_data.geo_main.city,
    contact_methods: data.personal_data.contact_methods,
  }
}

const showErrorSelectedRegion = () => {
  isErrorSelectedRegion.value = true
}
const likeChange = () => {
  const fieldChange: UserChangeItemStruct = {}
  console.log('form.value[id]', form.value, formDefault.value)
  for(let id in form.value) {
    let item = form.value[id as keyof UserFormItemStruct]
    let itemDefault = formDefault.value[id as keyof UserFormItemStruct]
    if(id === 'contact_methods'){
      fieldChange[id] = form.value[id]
    } else if((item as ICommonFormValid<string> | ISelectNumber).value ) {
      const itemValue = (item as ICommonFormValid<string> | ISelectNumber).value
      const itemValueDefault = (itemDefault as ICommonFormValid<string> | ISelectNumber).value
      if(itemValue !== itemValueDefault) {
        fieldChange[id] = itemValue
      }
    }
  }
  return fieldChange
}
const saveChange = () => {
  const field = likeChange()
  personalStore.changeUserData(field)
}
const showEditEmail = () => {
  isShowEditEmail.value = true
}
const closeEditEmail = () => {
  isShowEditEmail.value = false
}
const requestConfirm = async () => {
  //agreeConfirmUser.value = true
  if(!form.value.email.valid) return
  await confirmUser().then((res) => {
    agreeConfirmUser.value = true
  })
}
const confirmUser = async () => {
  return personalStore.changeEmailUser(form.value.email.value)
      .catch(err => {
        textInvalidOtpUnconfirmed.value = err
        throw err
      })
}
const sendOtp = async (otp: string) => {
  await personalStore.confirmChangeEmailUserWitchOtp(otp)
      .then( res => {
        textInvalidOtpUnconfirmed.value = ''
        isShowEditEmail.value = false
        agreeConfirmUser.value = false

        console.log('authStore.statusUser',authStore.statusUser)
        /*if(res?.token && authStore.statusUser === 'active') {
          console.log('переход в profile')
          if(authStore.lastPageRedirect) router.push(authStore.lastPageRedirect)
          else router.push('/personal/profile')
        } else textInvalidOtpUnconfirmed.value = 'Ошибка подтверждения'*/
      })
      .catch(e => {
        if(e && (e.statusCode == 401 || e.statusCode == 400)) {
          textInvalidOtpUnconfirmed.value = e.statusMessage
        }
      })


}
watch(() => props.user,
    (value) => {
      form.value = getFieldsForm()
      formDefault.value = getFieldsForm()
    }
)
watch(() => form.value.region,
    (newRegion) => {
      form.value.city = props.user.personal_data.geo_main.city || {}
      if(newRegion?.value) regionsStore.getCityList(newRegion.value)
    }
)
onMounted( () => {
  form.value = getFieldsForm()
  formDefault.value = getFieldsForm()
})
if(!regionsStore.regionsList) {
  regionsStore.updateRegionsList()
}

</script>

<template>
  <div class="personal-profile__form">
    <FormWindow type="original" class="personal-profile__form-window">
      <template #title>
         Редактирование информации
      </template>
      <BaseWrapperIconBlur @click="$emit('close')" class="personal-profile__form-window__change">
        <BaseIconClose class="icon" />
      </BaseWrapperIconBlur>
      <div class="personal-profile__form-window__block">
        <div class="personal-profile__form-window__block-title">
          <span>Личная информация</span>
        </div>
        <div class="personal-profile__form-window__block-row">
          <BaseInput
              v-model="form.first_name.value"
              form-name="first_name"
              title="Имя"
              :max-length="30"
              :rules="[ruleNotEmpty]"
              @onError="(val: boolean) => (form.first_name.valid = val)"
          />
          <BaseInput
              v-model="form.last_name.value"
              form-name="last_name"
              title="Фамилия"
              :rules="[ruleNotEmpty]"
              :max-length="64"
              @onError="(val: boolean) => (form.last_name.valid = val)"
          />
          <div class="personal-profile__form-window__block-row__email">
            Email: {{formDefault.email.value}}
            <BaseButton text="Сменить Email" @click="showEditEmail" />

          </div>

          <BaseSelect
              v-if="regionsList?.length"
              :items="regionsList"
              :show-error="isErrorSelectedRegion"
              :rules="[ruleRegions]"
              v-model="form.region"
              show-search
              name="ad-region"
              full-value
              placeholder="Регион"
          />
          <BaseSelect
              :disable="!form.region.value"
              :items="cityList"
              v-model="form.city"
              show-search
              name="ad-city"
              full-value
              placeholder="Город"
              @click="showErrorSelectedRegion"
          />
        </div>
      </div>
      <div class="personal-profile__form-window__block">
        <div class="personal-profile__form-window__block-title">
          <span>Контактные данные</span>
        </div>
        <UserContactMethodsSelect
            v-model="form.contact_methods"
            :contacts-session="formDefault.contact_methods"
            :email-session="form.email.value"
        />
      </div>
      <template #action-buttons>
        <BaseButton @click="saveChange" text="Сохранить" type="violet"/>
      </template>
    </FormWindow>
    <BaseModal :isShowModal="isShowEditEmail" @close="closeEditEmail">
      <FormWindow
          modal
          :is-prev="agreeConfirmUser"
          @prev="agreeConfirmUser = false"
      >
        <template #title>
          Смена Email
        </template>
        <template #subtitle>
          <span>Требуется подтвердить почту</span>
        </template>
        <BaseInput
            v-if="!agreeConfirmUser"
            v-model="form.email.value"
            title="E-mail"
            form-name="email"
            :rules="[ruleValidEmail, ruleNotEmpty]"
            :max-length="254"
            @onError="(val: boolean) => (form.email.valid = val)"
        />
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
              :disabled="form.email.value === formDefault.email.value"
              :text="`Подтвердить почту ${form.email.value}`"
              @click="requestConfirm" />
        </template>
      </FormWindow>
    </BaseModal>
  </div>
</template>

<style scoped lang="scss">
.personal-profile__form {
  width: 100%;
  &-window {
    width: 100%;
    max-width: 100%;
    display: flex;
    gap: 10px;
    &__change {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 2;
      .icon {
        width: 20px;
        height: 20px;
        color: $grey;
      }
      &:hover {
        box-shadow: $box-shadow-dark;
      }
    }
    &__block {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &-title {
        @include h6;
      }
      &-row {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }


  }
}
</style>