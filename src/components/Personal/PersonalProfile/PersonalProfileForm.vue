<script setup lang="ts">

import {computed, type PropType, ref} from 'vue';
import type {UserCreateItemStruct, UserFormItemStruct, UserItemFullStruct} from "~/struct/User/UserItemStruct";
import type {ICommonFormValid} from "~/struct/Common/ICommonForm";
import {ruleNotEmpty, ruleRegions, ruleValidEmail} from "~/utils/commonRules";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemFullStruct>,
    required: true,
  }
})

const regionsStore = useRegionsStore()

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
})
const formDefault = ref<UserFormItemStruct>(form.value)
const isErrorSelectedRegion = ref(false)

const getFieldsForm = () => {
  const data = props.user
  return {
    last_name: {
      value:data.personal_data.last_name,
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
  }

}
const regionsList = computed(() => regionsStore.regionsList)
const cityList = computed(() => regionsStore.cityList || [])

const showErrorSelectedRegion = () => {
  isErrorSelectedRegion.value = true
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
  console.log('regionsStore.regionsList', regionsStore.regionsList)
  console.log('form.value', form.value, form.value.region)
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
      <UserContactMethodsSelect />
    </FormWindow>
  </div>
</template>

<style scoped lang="scss">

</style>