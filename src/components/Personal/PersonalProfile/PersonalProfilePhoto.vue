<script setup lang="ts">

import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import {computed, type PropType, ref} from "vue";
import type {UserItemFullStruct} from "~/struct/User/UserItemStruct";
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemFullStruct>,
    required: true,
  }
})
const personalStore = usePersonalStore()
const uploadStore = useUploadStore()

const isShowChangePhoto = ref(false)
const imageList = ref<ICommonUpload[]>([])
const oldPhoto = ref('')

const userFullName = computed(() => `${props.user.personal_data.last_name} ${props.user.personal_data.first_name}` )

const changePhoto = () => {
  oldPhoto.value = props.user.personal_data.photo
  isShowChangePhoto.value = true
}
const updatePhoto = () => {
  if(!imageList.value.length || !imageList.value[0]?.imageUrl ) return
  personalStore.changeUserData({photo: imageList.value[0].imageUrl})
      .then(() => {
        imageList.value = []
        deleteImageStorage()
        isShowChangePhoto.value = false
      })
      .catch(() => { return } )
}
const hiddenChangePhoto = () => {
  imageList.value = []
  //
  deleteImageStorage()
  isShowChangePhoto.value = false
}
const deleteImageStorage = async () => {
  await uploadStore.deleteFileStorage(oldPhoto.value)
}


</script>

<template>
  <div class="personal-profile__photo">
    <div class="personal-profile__photo-head">
      <BaseProfileCircle
          :name="userFullName"
          is-change
          size="big"
          unfull
          :img="user.personal_data.photo"
          @change="changePhoto"
      />
      <p class="personal-profile__photo-head__name">{{userFullName}}</p>
    </div>
    <BaseModal :is-show-modal="isShowChangePhoto" @close="hiddenChangePhoto">
      <FormWindow>
        <CommonUploadImage :isShow="isShowChangePhoto" v-model="imageList" />
        <BaseButton v-if="imageList.length" text="Обновить" @click="updatePhoto"></BaseButton>
      </FormWindow>

    </BaseModal>
  </div>
</template>

<style scoped lang="scss">
.personal-profile__photo {
  width: 100%;
  &-head {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    &__name {
      @include h5();
    }
  }
}
</style>