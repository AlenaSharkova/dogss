<script setup lang="ts">

import type { DogFormCreateItemStruct } from "~/struct/Dog/DogItemStruct";
import BreedersSitePetsManageModal from "~/components/Breeders/BreedersSite/BreedersSitePetsManageModal.vue";

const props = defineProps({
})

const emits = defineEmits(['create', 'cancelEdit', ])

const isShowModal = ref(false)
const closeModal = () => {
  isShowModal.value = false
}
const addPet = () => {
  isShowModal.value = true
}
const createDog = (data: DogFormCreateItemStruct) => {
  emits('create', data)
  isShowModal.value = false
}
onMounted(() => {
  isShowModal.value = true
})
</script>

<template>
  <div class="breeder-site__pets-add" @click="addPet">
    <div class="breeder-site__pets-add__block">
      <div class="breeder-site__pets-add__block-wrapper">
        <div class="breeder-site__pets-add__block-text">
          <span>Добавить питомца</span>
        </div>
      </div>
    </div>
    <BreedersSitePetsManageModal
        @close="closeModal"
        @create="createDog"
        :is-show="isShowModal"
        type-action="create"
    />
  </div>
</template>

<style scoped lang="scss">
.breeder-site__pets-add {
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  display: flex;
  flex: 1;
  background: #fff;
  position: relative;
  //height: 100%;
  transition: all 0.2s ease-out;
  box-shadow: $box-shadow-lite;
  max-width: 500px;
  cursor: pointer;
  width: 500px;
  &__block {
    &-wrapper {
      padding: 20px;
    }
  }
}

</style>