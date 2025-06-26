<script setup lang="ts">

import type { PropType } from 'vue';
import type {UserCreateItemStruct, UserFormItemStruct, UserItemFullStruct} from "~/struct/User/UserItemStruct";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemFullStruct>,
    required: true,
  }
})

const form = ref<UserFormItemStruct>({
  last_name: '',
  first_name: '',
  email: '',
  phone: '',
  region: {},
  city: {},
})
const formDefault = ref<UserFormItemStruct>(form.value)

const getFieldsForm = () => {
  const data = props.user
  return {
    last_name: data.personal_data.last_name,
    first_name: data.personal_data.first_name,
    email: data.personal_data.email,
    phone: data.personal_data.phone,
    region: data.personal_data.geo_main.region,
    city: data.personal_data.geo_main.city,
  }

}

watch(() => props.user,
    (value) => {
      form.value = getFieldsForm()
      formDefault.value = getFieldsForm()
    }
)
onMounted(() => {
  form.value = getFieldsForm()
  formDefault.value = getFieldsForm()
})
</script>

<template>
  <div class="personal-profile__form">
    <FormWindow type="original">
      <BaseInput
          v-model="form.first_name"
          title="Имя"
      />

    </FormWindow>
  </div>
</template>

<style scoped lang="scss">

</style>