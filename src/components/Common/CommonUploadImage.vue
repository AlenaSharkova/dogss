<script setup lang="ts">


import BaseIconFile from "~/components/Base/BaseIcon/BaseIconFile.vue";
import {useUploadStore} from "~/stores/upload.store";
import DynamicRef from "ajv/lib/vocabularies/dynamic/dynamicRef";
import type {ICommonUpload, IUploadApi, IUploadCoordinates} from "~/struct/Common/ICommonUpload";
import type {Drop} from "esbuild";
import CommonAdvancedCropperModal from "~/components/Common/CommonAdvancedCropperModal.vue";
import {ref} from "vue";
import {Cropper} from "vue-advanced-cropper";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  isImageDefault: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 1
  },
  textBtn: {
    type: String,
    default: ''
  },
  isNeedEditSize: {
    type: Boolean,
    default: false,
  },
  isCustomerClick: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['click-main-btn']);
const imageList = defineModel<ICommonUpload[]>({default: []});

const uploadStore = useUploadStore();
//const messageStore = useMessageStore()

let fileRef = ref<any>(null);
let fileName = ref("")
let fileContent = ref("")
//let editSizeImage = ref(false)
const isDragging = ref(false)
const isShowAdvancedCropper = ref(false)
const imageEditedSize = ref<ICommonUpload | null>(null)

const isLimitExceeded = computed(() => imageList.value.length >= props.limit )
const textBtnFinal = computed(() => {
    if(props.textBtn) return props.textBtn
    else return props.limit === 1
    ? 'Выбрать изображение'
    : `Выбрать изображения (Максимум: ${props.limit})`
})

const readFile = async (event: Event) => {
  const elem = event.target as HTMLInputElement
  if (elem.files) {
    fileName.value = elem.files[0].name
    await readBeforeUpload(elem.files[0])
  } else return
}
async function readBeforeUpload(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  await uploadFiles(formData)
}

const uploadFiles = async (formData: any) => {
  imageList.value.push({
    imageUrl: null,
    status: 'processing'
  })
  console.log('imageList: ', imageList.value)

  const lastIndex = imageList.value.length - 1
  await uploadStore.uploadImage(formData).then(res => {
    if(res?.success) {
      imageList.value[lastIndex].imageUrl = res.url
      imageList.value[lastIndex].status = 'success'
    } else {
      imageList.value[lastIndex].status = 'error'
    }
  }).catch(err => {
    imageList.value[lastIndex].status = 'error'
  })
}
const deleteImageStorage = async (fileUploadInfo: ICommonUpload) => {
  if(!fileUploadInfo.imageUrl) return
  fileUploadInfo.status = 'disabled'
  await uploadStore.deleteFileStorage(fileUploadInfo.imageUrl).then(res => {
    imageList.value = imageList.value.filter(item => item !== fileUploadInfo)
  }).catch(err => {
    fileUploadInfo.status = 'success'
  })
}
const deleteImageFail = (fileUploadInfo: ICommonUpload) => {
  imageList.value = imageList.value.filter(item => item !== fileUploadInfo)
}

const isShowImageStore = (fileUploadInfo: ICommonUpload) => ['success', 'disabled'].includes(fileUploadInfo.status) && fileUploadInfo.imageUrl

const openFileExplorer = () => {
  if(isLimitExceeded.value) return
  if(props.isCustomerClick) emit('click-main-btn')
  else fileRef.value.click()
}
const editSizeImage = (item: ICommonUpload) => {
  imageEditedSize.value = item
  showAdvancedCropper()
}
const handleDragOver = () => {
  isDragging.value = true;
};
const handleDragLeave = () => {
  isDragging.value = false;
};
const handleDrop = (event: DragEvent) => {
  if(isLimitExceeded.value) return
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if(files?.length) readBeforeUpload(files[0]);
};
const showAdvancedCropper = () => {
  isShowAdvancedCropper.value = !!(props.isNeedEditSize && imageEditedSize.value?.imageUrl)
};
const cropper = ref<InstanceType<typeof Cropper> | null>(null) // Типизируем референс

const cropAndUpload = (data: {coordinates: IUploadCoordinates}) => {
  console.log('cropAndUpload', data)
  if(!imageEditedSize.value) return
  imageEditedSize.value.coordinates = data.coordinates
  console.log('imageList.value', imageList.value)
  isShowAdvancedCropper.value = false
}
const displayContainerWidth = computed(() => 100)
const coordinatesStyle = (image: ICommonUpload) => {
  if(!image.coordinates) return
  console.log('image', image)
  const img = new Image();
  img.src = image.imageUrl
  img.onload = () => {
    console.log("Ширина:", img.naturalWidth);
    console.log("Высота:", img.naturalHeight);
    // Здесь вы используете эти размеры для расчетов
  };
  const scale = displayContainerWidth.value / image.coordinates?.width
  console.log("scale:", scale);
  console.log("scale:", scale);
  const offsetX = -image.coordinates?.left * scale;
  const offsetY = -image.coordinates?.top * scale;
  return {
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    width: (img.naturalWidth * scale)  + 'px',
    height: (img.naturalHeight * scale) + 'px',
  }
}
watch(() => imageList.value, (newList) => {
  console.log('newList', newList)

  if(!imageEditedSize.value) return
  const isHasEditedInList = !!newList.find(item => item.imageUrl === imageEditedSize.value?.imageUrl)
  if(!isHasEditedInList) {
    imageEditedSize.value = null
  }

})
</script>

<template>
  <div class="common-upload__file">
    <div class="common-upload__file-action">
      <div
          v-if="isImageDefault"
          class="common-upload__file-action__start"
      >
        <div
            class="common-upload__file-action__start-block"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            @click="openFileExplorer"
            :class="{'--disabled': isLimitExceeded}"
        >
          <div class="common-upload__file-action__start-image">
            <BaseIconUploadDog />
          </div>
          <div v-if="isLimitExceeded" class="common-upload__file-action__start-text">
            <span>Спасибо, что загрузили фото</span>
          </div>
          <div v-else class="common-upload__file-action__start-text">
            <span>Перетащите изображение сюда или нажмите для выбора</span>
          </div>
        </div>
      </div>
      <BaseButton
        v-else
        @click="openFileExplorer"
        :disabled="isLimitExceeded"
        type="secondary"
        :text="textBtnFinal">
      </BaseButton>
    </div>
    <input class="common-upload__file-input" @change="readFile($event)" type="file" ref="fileRef"/>
    <div v-if="false" class="common-upload__file-block">
      <div class="common-upload__file__content">
        <div class="common-upload__file__content-icon">
          <BaseIconFile />
        </div>
        <span v-if="fileName" class="common-upload__file__content-text">{{fileName}}</span>
        <span v-else class="common-upload__file__content-text">Файл не загружен</span>
      </div>
    </div>
    <div class="common-upload__file-photos">

      {{imageList}}
      <div class="common-upload__file-photos__item"
           v-for="(item, index) in imageList"
           :key="index">
        <div v-if="isShowImageStore(item)"
             class="common-upload__file-photos__item-image"
             :class="{'--status-disabled': item.status === 'disabled'}"
        >
          <img :src="item.imageUrl as string" :style="coordinatesStyle(item)">
        </div>
        <div v-else class="common-upload__file-photos__item-default">
          <img v-if="item.status === 'processing'"
               src="@/assets/image/svg/spinner-default.svg"
               class="common-upload__file-photos__item-default__load">
          <BaseIconClose
              v-if="item.status === 'error'"
              @click="deleteImageFail(item)"
              color="error"/>
        </div>
        <div v-if="isShowImageStore(item)"
             class="common-upload__file-photos__item-close"
        >
          <BaseIconClose
              color="white"
              @click="deleteImageStorage(item)" />
        </div>
        <div v-if="isShowImageStore(item) && isNeedEditSize"
             class="common-upload__file-photos__item-edit"
        >
          <BaseIconChange
              class="edit-icon"
              @click="editSizeImage(item)" />
        </div>
      </div>
    </div>
    <CommonAdvancedCropperModal
        v-if="isShowAdvancedCropper"
        :is-show="isShowAdvancedCropper"
        :img-src="imageEditedSize?.imageUrl"
        @crop-and-upload="cropAndUpload"
    />


  </div>

</template>

<style scoped lang="scss">
.common-upload__file {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  &-input {
    display: none;
  }
  &-photos {
    display: flex;
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;

    &__item {
      position: relative;
      height: 100px;
      width: 100px;
      border-radius: 10px;
      background-color: $light-teal;
      display: flex;
      align-items: center;
      justify-content: center;
      &-default {
        width: 50px;
        &__load {
          width: 100%;
          animation: 0.8s linear infinite rotate;
        }
      }
      &-image {
        height: 100%;
        width: 100%;
        border-radius: inherit;
        overflow: hidden;

        &.--status-disabled {
          transition: opacity 0.2s;
          opacity: 0.5;
          pointer-events: none;
        }
        img {
          position: relative;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: inherit;
        }
      }
      &-close {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        backdrop-filter: blur(4px);
        background-color: rgba(71, 69, 109, 0.3);
        cursor: pointer;
        position: absolute;
        top: 2px;
        right: 2px;
      }
      &-edit {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        backdrop-filter: blur(4px);
        background-color: rgba(71, 69, 109, 0.3);
        cursor: pointer;
        position: absolute;
        bottom: 5px;
        right: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        .edit-icon {
          width: 16px;
          height: 16px;
          color: $white-text;
        }
      }
    }
  }
  &-block {
    display: grid;
    gap: 15px
  }
  &-content {
    width: 100%;
    height: 150px;
    border-radius: 20px;
    padding: 20px;
    background-color: $dark-text;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    &__icon {
      flex-shrink: 0;
      height: 65px;
    }
    &__text {
      color: white;
      font-size: 18px;
    }
  }
  &-action {
    width: 100%;
    display: flex;
    gap: 15px;
    &__start {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-block {
        cursor: pointer;
        max-width: 362px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 25px;
        border-radius: 25px;
        border: 5px dashed $violet;
        gap: 10px;
        &.--disabled {
          opacity: 0.5;
          cursor: auto;
        }
      }
      &-image {
        width: 200px;
      }
      &-text {
        text-align: center;
        color: $violet;
        @include text-normal(500)
      }
    }
  }
}
</style>