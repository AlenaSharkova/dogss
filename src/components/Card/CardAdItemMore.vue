<script setup lang="ts">
import BaseModal from "~/components/Base/BaseModal.vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {usePersonalAdStore} from "~/stores/personal-ad.store";

const props = defineProps({
  id: {
    type: Number,
  }
})
const emit = ['toEditAdAPage', 'toArchiveAd']

const router = useRouter()
const personalAdStore = usePersonalAdStore()

const isShowModalComplete = ref(false)
const completeAd = async () => {
  isShowModalComplete.value = true
  //await toArchiveAd()
}
const closeModalComplete = async () => {
  isShowModalComplete.value = false
}

const toArchiveAd = async () => {
  await personalAdStore.changeAd({}, props.id, 'archive')
      .then(res => {
        //router.push('/personal/publications?type=archive')
      }).catch(err => {
        console.log('eerrr', err)
      })
}
</script>

<template>
  <div class="card-ad__item-more">
    <div class="card-ad__item-more__list">
      <div class="card-ad__item-more__item" @click="$emit('toEditAdPage')">
        <span>Редактировать</span>
      </div>
      <div class="card-ad__item-more__item --red" @click="completeAd">
        <span>Завершить</span>
      </div>
    </div>
    <Teleport to="body">
      <BaseModal :isShowModal="isShowModalComplete" @close="closeModalComplete">
        <FormWindow modal>
          <template #title>Завершение объявления</template>
          <template #subtitle>Пожалуйста, укажите статус сделки</template>
          <template #default>
            <p>- Сделка совершена - Вам будет предоставлена ссылка для написания отзыва пользователем;</p>
            <p>- Сделка не состоялась - объявление будет перемещено в архив, без возможности оставить отзыв. Позже объявление может быть возобновлено.</p>
          </template>
          <template #action-buttons>
            <BaseButton text="Сделка совершена" type="violet" />
            <BaseButton text="Сделка не состоялась" type="red" />
          </template>
        </FormWindow>
      </BaseModal>
    </Teleport>
    <Teleport to="body">
      <BaseModal :isShowModal="isShowModalComplete0" @close="closeModalComplete">
        <FormWindow modal>
          <template #title>Объявление завершено, находится в архиве</template>
          <template #default>
            <p>Вы можете отправить ссылку пользователю для написания отзыва</p>
            <p :href="`http://localhost:3000/publications/comment?id=${id}`">http://localhost:3000/publications/comment?id={{id}}</p>
          </template>
          <template #action-buttons>
          </template>
        </FormWindow>
      </BaseModal>
    </Teleport>
  </div>

</template>

<style scoped lang="scss">
.card-ad__item-more {
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
  &__list {
    display: flex;
    flex-direction: column;
    gap: 5px;

  }
  &__item {
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
</style>