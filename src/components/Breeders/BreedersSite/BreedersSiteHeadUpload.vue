<script setup lang="ts">

import {computed, defineProps, type PropType, ref, withDefaults} from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import {useCommonStore} from "~/stores/common.store";
import type {UserPageSectionType} from "~/struct/User/UserPageStruct";
import type {BreederSiteSectionType} from "~/struct/Breeder/BreederSiteStruct";
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  typeAction: {
    type: String as PropType< 'create' | 'change' | 'view'>,
    default: 'create'
  },
})
const imageList = defineModel<ICommonUpload[]>({default: []});

const isShowUploadModal = ref(false)
const showUploadModal = () => {
  isShowUploadModal.value = true
}
const closeUploadModal = () => {
  isShowUploadModal.value = false
}
</script>

<template>
  <div class="breeder-site-header-upload">
    <BaseButton
        class="breeder-site-header-upload__button"
        text="Перейти к добавлению баннера"
        type="teriary"
        @click="showUploadModal"
    />
    <CommonUploadImageModal
        :isShow="isShowUploadModal"
        titleModal="Загрузите баннер"
        text-next-btn="Перейти к объявлению"
        v-model="imageList"
        is-banner
        @close="closeUploadModal"
    />

  </div>
</template>

<style scoped lang="scss">
.breeder-site-header-upload {
  position: absolute;
  bottom: 120px;
  right: 20px;
  &__button {

  }

}
</style>