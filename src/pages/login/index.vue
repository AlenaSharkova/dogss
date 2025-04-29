<script setup lang="ts">

import {formatFromAmount} from "~/utils/formatData";
import AuthService from "~/service/auth.service";
import {useAuthStore} from "~/stores/auth.store";
import {useUsersStore} from "~/stores/users.store";

const form = reactive({
  phone: '',
})

const sendSMS1 = () => {
  const amount = form.phone.replace(/[^0-9]/g, "")
  console.log('amount', amount)
}
const authStore = useAuthStore()

const sendSMS = () => {
  authStore.SendEmail()
}
</script>

<template>
  <LayoutWrapperPage class="page-login">

    <FormWindow>
      <template #title>
        Вход
      </template>
      <template #subtitle>
        форма
      </template>
      <template #default>
        <BaseInput
            v-model="form.phone"
            title="Введите номер телефона"
            total-number
            prefix="+7"
            mask=" (___) ___ __-__"
        />
        <BaseInput
            v-model="form.phone"
            title="Введите почту "
        >
        </BaseInput>
      </template>
      <template #action-buttons>
        <BaseButton text="Отправить" @click="sendSMS" />
      </template>
    </FormWindow>

  </LayoutWrapperPage>
</template>

<style scoped lang="scss">
.page-login {
  margin-top: 20px;
}
</style>