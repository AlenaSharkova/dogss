<script setup lang="ts">
import BaseModal from "~/components/Base/BaseModal.vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {usePersonalAdStore} from "~/stores/personal-ad.store";
import {useAdCommentStore} from "~/stores/ad-comment.store";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  isShowMore: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['editDog'])

const router = useRouter()
const personalAdStore = usePersonalAdStore()
const adCommentStore = useAdCommentStore()
const commonStore = useCommonStore()

const isShowModalDeleteDog = ref(false)
const isShowModalCommentToAd = ref(false)
const showModalDeleteDog = () => {
  isShowModalDeleteDog.value = true
  commonStore.infoResultModal = {
    title: 'Вы уверены, что хотите удалить запись о питомце',
    status: 'attention'
  }
}
const closeModalDeleteDog = () => {
  isShowModalDeleteDog.value = false
}
const showModalCommentToAd = () => {
  adCommentStore.showOfferLeaveComment(props.id)
}
const closeModalCommentToAd = () => {
  isShowModalCommentToAd.value = false
}

const toArchiveSuccess = async () => {
  await personalAdStore.changeAd({}, props.id, 'archive-success')
      .then(res => {
        personalAdStore.updatePersonalAdList()
        //closeModalComplete()
        showModalCommentToAd()
      }).catch(err => {
        console.log('eerrr', err)
      })
}
const toArchiveClose = async () => {
  await personalAdStore.changeAd({}, props.id, 'archive-close')
      .then(res => {
        closeModalComplete()
      }).catch(err => {
        console.log('eerrr', err)
      })
}
</script>

<template>
  <div class="card-breeder__item-more">
    <Transition name="fade">
      <div v-if="isShowMore" class="card-breeder__item-more__window">
        <div class="card-breeder__item-more__window-list">
          <div class="card-breeder__item-more__window-item" @click="$emit('editDog')">
            <span>Редактировать</span>
          </div>
          <div class="card-breeder__item-more__window-item" @click="router.push(`/dog/${id}`)">
            <span>Просмотреть</span>
          </div>
          <div class="card-breeder__item-more__window-item --red" @click="showModalDeleteDog">
            <span>Завершить</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>

</template>

<style scoped lang="scss">
.card-breeder__item-more {
  &__window {
    position: absolute;
    z-index: 2;
    //width: 50px;
    //height: 50px;
    backdrop-filter: blur(6px);
    box-shadow: $box-shadow-middle;
    top: 108%;
    transition: all 0.3s;
    border-radius: 10px;
    right: 0;
    background-color: rgba(227, 237, 227, 0.9);
    padding: 8px;
    &-list {
      display: flex;
      flex-direction: column;
      gap: 5px;

    }
    &-item {
      @include text-normal(500);
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 5px;
      transition: all 0.2s;
      &:hover {
        background-color: $violet;
        color: $white-text;
      }
      &.--red {
        color: $error-text;
        &:hover {
          background-color: $error;
          color: $white-text;
        }
        //background-color: $light-teal-66;

      }
    }
  }

}
</style>