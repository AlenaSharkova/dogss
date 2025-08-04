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

const textMessage = "Здравствуйте!%0A" + encodeURIComponent("Пишу насчёт Вашего объявления с сайта ПёSeek!")

const getHref = (id: IContactValue, item: string) => {
  switch (id) {
    //case "email": return `mailto:${item}?subject=${encodeURIComponent('Платформа ПёSeek')}&body=${textMessage}`
    case "email": return `https://e.mail.ru/compose/?To=${item}&Subject=${encodeURIComponent('Объявление на платформа ПёSeek')}&Body=${textMessage}`
    case "phone": return `tel:+${item}`
    case "whatsapp": return `https://wa.me/${item}?text=${textMessage}`
    case "tg": return `https://t.me/${item}?text=${textMessage}`
    case "vk": return item.replace('https://vk.com/', 'https://vk.me/')
  }
}
const goToPage = (id: IContactValue, item: string) => {
  console.log('id, item', id, item, getHref(id, item))
  window.open(getHref(id, item), '_blank', "noreferrer");
}
</script>

<template>
  <div class="contact-methods-view">
    <div class="contact-methods-view__link"
       v-for="(item, index) in contacts"
       :key="index"
       @click="goToPage(index, item as string)"

    >
      <UserContactMethodsSelectItem
          :is-select="true"
          :value="item"
          :name="index"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-methods-view {
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
  gap: 15px;

  @media (max-width: $xs) {
    //grid-template-columns: repeat(2, 1fr);
  }
}
a[href^="mailto:"] {
  font-size: 16px;
  line-height: 32px;
  color: #000000;
}
</style>