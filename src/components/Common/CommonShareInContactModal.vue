<script setup lang="ts">

import type {
  AdShareContactMethods,
  UserContactMethodsFormItemStruct,
  UserContactMethodsOptimalStruct,
  UserContactMethodsStruct
} from "~/struct/User/UserItemStruct";
import type {PropType} from "vue";
import type {IContactValue} from "~/struct/Common/IValueType";

const props = defineProps({
  isShowModal: {
    type: Boolean,
    default: false
  },
  path: {
    type: String,
    required: true
  },
  typeShare: {
    type: String as PropType<'ad'>,
    required: true
  },
})
const emit  = defineEmits(['close'])
const commonStore = useCommonStore()

const methods = ref<AdShareContactMethods>({
  tg: 'Telegram',
  whatsapp: 'Whatsapp',
  vk: 'ВКонтакте',
  copy: 'Скопировать',
})

const domain = 'http://192.168.0.196:3000'
const shareUrl = computed(() => domain + props.path)
const shareTitleList = ref(
    [
      {
        type: 'ad',
        text: 'Присылаю объявление с сайта ПёSeek!'
      }
    ]
)
const shareTitle = computed(() => shareTitleList.value.find(item => item.type === props.typeShare))

const copyToClipboard = () => {
  return navigator.clipboard.writeText(shareUrl.value).then(
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
    case "whatsapp": return `https://wa.me/?text=${encodeURIComponent(`${shareTitle.value} ${shareUrl.value}`)}`
    //case "tg": return `https://t.me/${item}?text=${textMessage}`
    case "tg": return `https://telegram.me/share/url?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(shareTitle.value)}`
    case "vk": return `https://vk.com/share.php?url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(shareTitle.value)}&description=${encodeURIComponent(shareTitle.value)}`
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