<script setup lang="ts">

import type {IContactValue} from "~/struct/Common/IValueType";
import {ruleNotEmpty, ruleValidEmail} from "~/utils/commonRules";
import UserContactMethodsSelectItem from "~/components/User/UserContactMethodsSelectItem.vue";

const methods = ref({
  email: {
    value: '',
    isSelect: false,
    isEdit: false,
    valueInput: '',
    validInput: false
  },
  phone: {
    value: '',
    isSelect: false,
    isEdit: false,
    valueInput: '',
    validInput: false
  },
  tg: {
    value: '',
    isSelect: false,
    isEdit: false,
    valueInput: '',
    validInput: false
  },
  whatsapp: {
    value: '',
    isSelect: false,
    isEdit: false,
    valueInput: '',
    validInput: false
  },
  vk: {
    value: '',
    isSelect: false,
    isEdit: false,
    valueInput: '',
    validInput: false
  },
})
/*const isSelectMethod = (methodId: string) => {
  listMethodsSelect.value.includes(methodId)
}*/
const saveChangeMethod = (idSelect: IContactValue) => {
  const methodItem = methods.value[idSelect]
  console.log('save', methodItem)
  if(methodItem.validInput) {
    methodItem.value = methodItem.valueInput
    methodItem.isEdit = false
  }
}
const toggleActivity  = (idSelect: IContactValue) => {
  const methodItem = methods.value[idSelect]
  if(!methodItem.isSelect && !methodItem.value) {
    for (let id in methods.value) {
      methods.value[id].isEdit = id === idSelect
    }
  }
  methodItem.isSelect = !methodItem.isSelect
  //methodItem.isEdit = false
}
const editValueMethod = (idSelect: IContactValue) => {
  for (let id in methods.value) {
    methods.value[id].isEdit = id === idSelect
  }
  methods.value[idSelect].isSelect = true

}
const closeEditValueMethod = (idSelect: IContactValue) => {
  const methodItem = methods.value[idSelect]
  methodItem.isEdit = false
  methodItem.valueInput = ''
  if(methodItem.isSelect && !methodItem.value) {
    methods.value[idSelect].isSelect = false
  }
}
</script>

<template>
  <div class="contact-methods-select">
    <div class="contact-methods-select__wrapper">
      <div class="contact-methods-select__list">
        <UserContactMethodsSelectItem
            :is-select="methods.email.isSelect"
            :is-edit="methods.email.isEdit"
            :value="methods.email.value"
            :valid-inpit="methods.email.validInput"
            name="email"
            @click="toggleActivity('email')"
            @edit-change="editValueMethod('email')"
            @close-edit-change="closeEditValueMethod('email')"
            @save-change="saveChangeMethod('email')"
        >
          <BaseInput
              v-model="methods.email.valueInput"
              title="E-mail"
              form-name="email"
              :rules="[ruleValidEmail, ruleNotEmpty]"
              :max-length="254"
              errorBackground
              @onError="(val: boolean) => (methods.email.validInput = val)"
          />
        </UserContactMethodsSelectItem>
        <UserContactMethodsSelectItem
            :is-select="methods.phone.isSelect"
            :is-edit="methods.phone.isEdit"
            :value="methods.phone.value"
            name="phone"
            @click="toggleActivity('phone')"
            @edit-change="editValueMethod('phone')"
            @close-edit-change="closeEditValueMethod('phone')"
            @save-change="saveChangeMethod('phone')"
        >
          <BaseInput
              v-model="methods.phone.valueInput"
              title="Номер телефона"
              type="tel"
              form-name="phone"
              :rules="[ruleValidNumberPhone]"
              mask="+7 (___) ___ __-__"
              errorBackground
              @onError="(val: boolean) => (methods.phone.validInput = val)"
          />
        </UserContactMethodsSelectItem>
        <UserContactMethodsSelectItem
            :is-select="methods.tg.isSelect"
            :is-edit="methods.tg.isEdit"
            :value="methods.tg.value"
            name="tg"
            @click="toggleActivity('tg')"
            @edit-change="editValueMethod('tg')"
            @close-edit-change="closeEditValueMethod('tg')"
            @save-change="saveChangeMethod('tg')"
        >
          <BaseInput
              v-model="methods.tg.valueInput"
              title="E-mail"
              form-name="tg"
              :rules="[ruleValidEmail, ruleNotEmpty]"
              :max-length="254"
              errorBackground
              @onError="(val: boolean) => (methods.tg.validInput = val)"
          />
        </UserContactMethodsSelectItem>
        <UserContactMethodsSelectItem
            :is-select="methods.whatsapp.isSelect"
            :is-edit="methods.whatsapp.isEdit"
            :value="methods.whatsapp.value"
            name="whatsapp"
            @click="toggleActivity('whatsapp')"
            @edit-change="editValueMethod('whatsapp')"
            @close-edit-change="closeEditValueMethod('whatsapp')"
            @save-change="saveChangeMethod('whatsapp')"
        >
          <BaseInput
              v-model="methods.whatsapp.valueInput"
              title="E-mail"
              form-name="whatsapp"
              :rules="[ruleValidEmail, ruleNotEmpty]"
              :max-length="254"
              errorBackground
              @onError="(val: boolean) => (methods.whatsapp.validInput = val)"
          />
        </UserContactMethodsSelectItem>
        <UserContactMethodsSelectItem
            :is-select="methods.vk.isSelect"
            :is-edit="methods.vk.isEdit"
            :value="methods.vk.value"
            name="vk"
            @click="toggleActivity('vk')"
            @edit-change="editValueMethod('vk')"
            @close-edit-change="closeEditValueMethod('vk')"
            @save-change="saveChangeMethod('vk')"
        >
          <BaseInput
              v-model="methods.vk.valueInput"
              title="E-mail"
              form-name="vk"
              :rules="[ruleValidEmail, ruleNotEmpty]"
              :max-length="254"
              errorBackground
              @onError="(val: boolean) => (methods.vk.validInput = val)"
          />
        </UserContactMethodsSelectItem>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-methods-select {
  &__list {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 10px;
  }
}
</style>