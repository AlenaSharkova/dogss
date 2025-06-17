<script setup lang="ts">


import BaseIconFile from "~/components/Base/BaseIcon/BaseIconFile.vue";
import {useUploadStore} from "~/stores/upload.store";
import DynamicRef from "ajv/lib/vocabularies/dynamic/dynamicRef";
import type {ICommonUpload, IUploadApi} from "~/struct/Common/ICommonUpload";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["close"]);
const imageList = defineModel<ICommonUpload[]>({default: []});

const uploadStore = useUploadStore();
//const messageStore = useMessageStore()


let fileRef = ref<any>(null);
let fileName = ref("")
let fileContent = ref("")

//const currentChat = computed(() => chatsStore.currentChat )


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
const fileEncrypted = ref<any>(null )
let authStore = useAuthStore();

const uploadFiles = async (formData: any) => {
  console.log('uploadFiles: ', formData)
  imageList.value.push({
    imageUrl: null,
    status: 'processing'
  })
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
</script>

<template>

  <div class="common-upload__file">
    <div class="common-upload__file-action">
      <BaseButton @click="fileRef.click()"
                  :disabled="imageList.length >= 10"
                  rounded="rounded-l"
                  type="secondary"
                  text="Выбрать изображения (до 10 штук)">
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

      <div class="common-upload__file-photos__item"
           v-for="(item, index) in imageList"
           :key="index">
        <div v-if="isShowImageStore(item)"
             class="common-upload__file-photos__item-image"
             :class="{'--status-disabled': item.status === 'disabled'}"
        >
          <img :src="item.imageUrl as string">
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
      </div>
    </div>


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
        &.--status-disabled {
          transition: opacity 0.2s;
          opacity: 0.5;
          pointer-events: none;
        }
        img {
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
    gap: 15px
  }

}
</style>