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

const props = defineProps({
  user: {
    type: Object as PropType<UserItemFullStruct>,
    required: true,
  }
})

const regionsStore = useRegionsStore()
const personalStore = usePersonalStore()
const personalAdStore = usePersonalAdStore()


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
const regionsList = computed(() => regionsStore.regionsList)
const cityList = computed(() => regionsStore.cityList || [])
const isEmptyContacts = computed(() => !Object.getOwnPropertyNames(formDefault.value.contact_methods).length && !Object.getOwnPropertyNames(form.value.contact_methods).length)

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
  personalAdStore.changeUserData(field)
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
    <FormWindow type="original">
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
      <BaseInput
          v-model="form.email.value"
          title="E-mail"
          form-name="email"
          :rules="[ruleValidEmail, ruleNotEmpty]"
          :max-length="254"
          @onError="(val: boolean) => (form.email.valid = val)"
      />


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
      <UserContactMethodsSelect
          v-if="!isEmptyContacts"
          v-model="form.contact_methods"
          :contacts-session="formDefault.contact_methods"
          :email-session="form.email.value"
      />
      <template #action-buttons>
        <BaseButton @click="saveChange" text="Сохранить" type="violet"/>
      </template>
    </FormWindow>
  </div>
</template>

<style scoped lang="scss">

</style>