<script setup lang="ts">

import type {UserContactMethodsOptimalStruct, UserContactMethodsStruct} from "~/struct/User/UserItemStruct";
import type {PropType} from "vue";
import type {IContactValue} from "~/struct/Common/IValueType";

defineProps({
  contacts: {
    type: Object as PropType<UserContactMethodsOptimalStruct<string>>,
    required: true
  }
})

//<a href="https://wa.me/79538143425?text=" >Напишите мне в WhatsApp!</a>

const textMessage = encodeURIComponent("Здравствуйте! Пишу насчёт Вашего объявления с сайта dogsik!")

const getHref = (id: IContactValue, item: string) => {
  switch (id) {
    case "email": return `mailto:${item}&body=${textMessage}?subject=Платформа Dogsik`
    case "phone": return `tel:+${item}`
    case "whatsapp": return `https://wa.me/${item}?text=${textMessage}`
    case "tg": return `https://t.me/${item}?text=${textMessage}`
    case "vk": return item
  }
}
</script>

<template>
  <div class="contact-methods-view">
    <a class="contact-methods-view__link"
       v-for="(item, key) in contacts"
       :index="key"
       :href="getHref(key, item as string)"
       target="_blank" rel="noreferrer"
    >
      <UserContactMethodsSelectItem
          :is-select="true"
          :value="item"
          :name="key"
      />
    </a>
  </div>
</template>

<style scoped lang="scss">
.contact-methods-view {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  @media (max-width: $xs) {
    grid-template-columns: repeat(2, 1fr);
  }
}
a[href^="mailto:"] {
  font-size: 16px;
  line-height: 32px;
  color: #000000;
}
</style>