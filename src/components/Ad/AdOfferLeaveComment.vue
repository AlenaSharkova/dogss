<script setup lang="ts">

import BaseModal from "~/components/Base/BaseModal.vue";

const adCommentStore = useAdCommentStore()
const route = useRoute()

const loadGetHash = ref(false)

const idAdForComment = computed(() => adCommentStore.idAdOfferLeaveComment)
const hashLink = computed(() => adCommentStore.hashLink)
const textLink = computed(() => `http://192.168.0.196:3000/publication/comment/${adCommentStore.hashLink}`)

const closeModalCommentToAd = () => {
  adCommentStore.idAdOfferLeaveComment = null
}

const getHashLinkComment = async () => {
  if(!idAdForComment.value) return
  loadGetHash.value = true
  await adCommentStore.getHashLinkComment(idAdForComment.value)
  loadGetHash.value = false
}

watch(() => route.fullPath,
    (newPath) => {
      closeModalCommentToAd()
    }
)
</script>

<template>
  <BaseModal class="ad-offer-leave-comment" :isShowModal="!!idAdForComment" @close="closeModalCommentToAd">
    <FormWindow modal>
      <template #title>Объявление завершено, находится в архиве</template>
      <template #default>
        <div class="ad-offer-leave-comment__content">
          <p>Вы можете отправить ссылку пользователю для написания отзыва</p>
          <div v-if="hashLink" class="ad-offer-leave-comment__content-link">
            <p>{{textLink}}</p>
            <CommonCopy :text="textLink" />
          </div>
        </div>
        <div class="ad-offer-leave-comment__content-success">
          <div class="ad-offer-leave-comment__content-success__icon">
            <BaseIconResult v-if="hashLink" name="success" />
          </div>
        </div>


      </template>
      <template #action-buttons>
        <BaseButton v-if="!hashLink" text="Создать ссылку" :load="loadGetHash" @click="getHashLinkComment" />
        <BaseButton v-if="!hashLink" text="Закрыть" :load="loadGetHash" type="red" @click="closeModalCommentToAd" />
      </template>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.ad-offer-leave-comment {
  &__content {
    display: flex;
    gap: 15px;
    flex-direction: column;
    &-link {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    &-success {
      display: flex;
      align-items: center;
      justify-content: center;
      &__icon {
        width: 150px;
      }
    }
  }

}
</style>