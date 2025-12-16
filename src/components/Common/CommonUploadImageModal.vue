<script lang="ts" setup>

import type {ICommonUpload, IUploadCoordinates} from "~/struct/Common/ICommonUpload";
import BreederSiteSelectSizeBanner from "~/components/Breeders/BreedersSite/BreedersSiteSelectPositionBanner.vue";
import CommonAdvancedCropperModal from "~/components/Common/CommonAdvancedCropperModal.vue";
import { Cropper } from "vue-advanced-cropper";
import {ref} from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  isBanner: {
    type: Boolean,
    default: false
  },
  isAdvancedCropper: {
    type: Boolean,
    default: false
  },
  titleModal: {
    type: String,
    default: 'Загрузка изображений'
  },
  textNextBtn: {
    type: String,
    default: 'Вернуться'
  },
  limit: {
    type: Number,
    default: 1
  },
})

const emit = defineEmits(["close"]);
const imageList = defineModel<ICommonUpload[]>({default: []});

const isShowModalBannerSize = ref(false)

const closeModalBannerSize = () => {
  isShowModalBannerSize.value = false
}
const showModalBannerSize = () => {
  isShowModalBannerSize.value = true
}



/*watch(() => ((props.isBanner && imageList.value[0]?.status === 'success')), (isNewShowModalBannerSize) => {
  isShowModalBannerSize.value = isNewShowModalBannerSize
})*/
</script>

<template>
  <Teleport to="body">
    <BaseModal :is-show-modal="isShow" @close="emit('close')" >
      <FormWindow modal class="common-upload-image-modal">
        <template #title>{{titleModal}}</template>

        <BreedersSiteSelectPositionBanner
            :is-show="isShowModalBannerSize"
            v-model="imageList"
            @close="closeModalBannerSize"
        />
        <CommonUploadImage
            v-model="imageList"
            :is-show="isShow"
            is-image-default
            :is-need-edit-size="isAdvancedCropper"
            :limit="limit"
        />
        <template #action-buttons>
          <BaseButton
              v-if="imageList?.length"
              :text="textNextBtn"
              type="violet"
              @click="emit('close')"/>
          <BaseButton
              v-if="isBanner"
              text="Баннер на разных экранах"
              :disabled="imageList[0]?.status !== 'success'"
              type="violet"
              @click="showModalBannerSize"/>
        </template>
      </FormWindow>
    </BaseModal>
  </Teleport>
</template>

<style scoped lang="scss">
.common-upload-image-modal {
  min-width: 550px;
  @media (max-width: $sm) {
    min-width: auto;
  }
}
</style>