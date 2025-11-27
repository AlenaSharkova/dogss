<script setup lang="ts">

import CardDogsItem from "~/components/Card/CardDogsItem.vue";
import type {PropType} from "vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import type {BreederSiteItemStruct} from "~/struct/Breeder/BreederSiteStruct";
import type {DogCreateItemStruct, DogFormCreateItemStruct, DogShortItemStruct} from "~/struct/Dog/DogItemStruct";
import BreederSitePetsManageModal from "~/components/Breeders/BreedersSite/BreederSitePetsManageModal.vue";

const props = defineProps({

})

const emits = defineEmits(['create'])

const isShowModal = ref(false)
const addPet = () => {
  isShowModal.value = true
}
const createDog = (data: DogFormCreateItemStruct) => {
  emits('create', data)
  isShowModal.value = false
}

</script>

<template>
  <div class="breeder-site__pets-add">
    <div class="breeder-site__pets-add__button">
      <div @click="addPet" class="breeder-site__pets-add__button-wrapper">
        <div class="breeder-site__pets-add__button-text">
          <span>Добавить питомца</span>
        </div>
      </div>
    </div>
    <BreederSitePetsManageModal @create="createDog" :is-show="isShowModal" type-action="create"/>
  </div>
</template>

<style scoped lang="scss">
.breeder-site__pets-add {
  &__button {
    width: 200px;
    height: 50px;
    background: $grey-lite;
    &-wrapper {
      padding: 20px;
    }
  }
}

</style>