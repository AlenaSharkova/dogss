<script setup lang="ts">

import type {
  AdShareContactMethods,
  UserContactMethodsFormItemStruct,
  UserContactMethodsOptimalStruct,
  UserContactMethodsStruct
} from "~/struct/User/UserItemStruct";
import type {PropType} from "vue";
import type {IContactValue} from "~/struct/Common/IValueType";

defineProps({
  contacts: {
    type: Object as PropType<UserContactMethodsOptimalStruct<string>>,
    required: false
  },
  isShowModal: {
    type: Boolean,
    default: false
  }
})
const emit  = defineEmits(['close'])
const commonStore = useCommonStore()

const methods = ref<AdShareContactMethods>({
  tg: 'Telegram',
  whatsapp: 'Whatsapp',
  vk: 'ВКонтакте',
  copy: 'Скопировать',
})


const textMessage = "Здравствуйте!%0A" + encodeURIComponent("Пишу насчёт Вашего объявления с сайта ПёSeek!")
const adUrl = ref('http://192.168.0.196:3000/publication/20')
const adTitle = ref('Check out this ad!')

const copyToClipboard = () => {
  return navigator.clipboard.writeText(adUrl.value).then(
      () => {
        commonStore.addUserInfoAlert('Ссылка скопирована')
        emit('close')
      }
  ).catch((err) => {
    console.log('Ссылка не скопирована')
  })

}
const getHref = (id: IContactValue | 'copy') => {
  switch (id) {
    //case "email": return `mailto:${item}?subject=${encodeURIComponent('Платформа ПёSeek')}&body=${textMessage}`
    case "whatsapp": return `https://wa.me/?text=${encodeURIComponent(`${adTitle.value} ${adUrl.value}`)}`
    //case "tg": return `https://t.me/${item}?text=${textMessage}`
    case "tg": return `https://telegram.me/share/url?url=${encodeURIComponent(adUrl.value)}&text=${encodeURIComponent(adTitle.value)}`
    case "vk": return `https://vk.com/share.php?url=${encodeURIComponent(adUrl.value)}&title=${encodeURIComponent(adTitle.value)}&description=${encodeURIComponent(adTitle.value)}`
  }
}
const shareIn = (id: IContactValue | 'copy') => {
  if(id === 'copy') copyToClipboard()
  else {
    window.open(getHref(id), '_blank', "noreferrer");
    emit('close')
  }
}
</script>

<template>
  <BaseModal @close="emit('close')" :is-show-modal="isShowModal">
    <FormWindow modal>
      <template #title>Поделиться в...</template>
      <template #subtitle>Поделитесь ссылкой в удобном для Вас месте или&nbsp;скопируйте&nbsp;её</template>
      <div class="ad-share-in-contact-modal">
        <div class="ad-share-in-contact-modal__block"
           v-for="(item, index) in methods"
           :key="index"
           @click="shareIn(index)"
        >
          <UserContactMethodsSelectItem
              :is-select="true"
              type="share"
              :value="item"
              :name="index"
          />
        </div>
      </div>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.ad-share-in-contact-modal {
  min-width: 700px;
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 15px;

  @media (max-width: $xs) {
    min-width: auto;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

    //grid-template-columns: repeat(2, 1fr);
  }
}

</style>