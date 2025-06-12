<script setup lang="ts">


import BaseIconFile from "~/components/Base/BaseIcon/BaseIconFile.vue";
import {useUploadStore} from "~/stores/upload.store";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["close"]);


const uploadStore = useUploadStore();
//const messageStore = useMessageStore()


let fileRef = ref(null);
let fileName = ref("")
let fileContent = ref("")

//const currentChat = computed(() => chatsStore.currentChat )


const readFile = async (event: Event) => {
  const elem = event.target as HTMLInputElement
  if (elem.files) {
    const reader = new FileReader()
    fileName.value = elem.files[0].name

    await readBeforeUpload(elem.files[0])

    reader.onload = async (e) => {
      fileContent = elem.result; // Содержимое файла
      fileName.value = elem.files[0].name
      await readBeforeUpload(event.target.files[0])
    };


  } else return
}
async function readBeforeUpload(file: File) {
  let reader = new FileReader();
  const formData = new FormData();
  console.log('file', file);

  formData.append('file', file);

  console.log('readBeforeUpload - formData contents:');
  formData.forEach((value, key) => {
    console.log(key, value); // Логируем содержимое formData
  });

  console.log('readBeforeUpload', formData)
  await uploadFiles(formData)


}
const fileEncrypted = ref<any>(null )


let authStore = useAuthStore();
//const chatData = computed(() => chatsStore.currentChat)

const sendFile = async () => {
  //let msgEncrypted = await encryptMessage(fileEncrypted.value.fileName, chatData.value.id);
  console.log('отправить ФАЙЛ', fileEncrypted.value)
  if(fileEncrypted.value.filenameEncrypted) {
    /*await sendMsgSocket({
      sender_id: String(authStore.userData.id),
      text: encryptedMessage.toString(),
      message_type: 'files',
      room_id: chatData.value.id,
      iv: iv.toString(),
    }, chatData.value.id ).then(() => {
      steps[2].status = 'success'
      const t = setTimeout(() => {
        emit('close')
      }, 1500)
    }).catch(err => {
      steps[2].status = 'err'
    })*/
  }
}

const uploadFiles = async (formData: any) => {
  console.log('uploadFiles: ', formData)

   await uploadStore.uploadImage(formData).then(res => {
    console.log(res)
  }).catch(err => {
    console.log('err: ', err)
  })
  /*messageStore.uploadFiles(file, file_name).then(res => {
    steps[1].status = 'success'
  }).catch(err => {
    steps[1].status = 'err'
  })
  console.log('ЗАГРУЗИТЬ ФАЙЛ', file)*/
}
const deleteImageStorage = async (fileUrl: string) => {
  console.log('uploadFiles: ', formData)

   await uploadStore.deleteFileStorage(fileUrl).then(res => {
    console.log(res)
  }).catch(err => {
    console.log('err: ', err)
  })
}
</script>

<template>
  <BaseModal class="common-modal__file" :is-show-modal="isShow" @close="$emit('close')">
    <FormWindow modal @close="$emit('close')">
      <template #title>
        Добавить файл
      </template>
      <template>
        <div class="common-modal__file-main">

          <input class="common-modal__file-main__hidden" @change="readFile($event)" type="file" ref="fileRef"/>
          <div class="common-modal__file-main__block">
            <div class="common-modal__file-main__content">
              <div class="common-modal__file-main__content-icon">
                <BaseIconFile />
              </div>
              <span v-if="fileName" class="common-modal__file-main__content-text">{{fileName}}</span>
              <span v-else class="common-modal__file-main__content-text">Файл не загружен</span>
            </div>
          </div>

          <div class="common-modal__file-main__action">
            <BaseButton @click="fileRef.click()" rounded="rounded-l"
                        text="Выбрать файл">
            </BaseButton>
            <BaseButton @click="sendFile"
                        text="Отправить"
                        :disabled="gals"
            >
            </BaseButton>
          </div>
        </div>
      </template>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.common-modal__file {
  &-main {
    display: flex;
    gap: 50px;
    flex-direction: column;
    &__hidden {
      display: none;
    }
    &__block {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px
    }
    &__content {
      height: 150px;
      border-radius: 20px;
      padding: 20px;
      background-color: $dark-text;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      &-icon {

        flex-shrink: 0;
        height: 65px;
      }
      &-text {
        color: white;
        font-size: 18px;
      }
    }
    &__action {
      width: 100%;
      display: flex;
      gap: 15px
    }
  }

}
</style>