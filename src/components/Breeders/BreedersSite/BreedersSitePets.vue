<script setup lang="ts">

import CardDogsItem from "~/components/Card/CardDogsItem.vue";
import {computed, type PropType} from "vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import type {BreederSiteItemStruct} from "~/struct/Breeder/BreederSiteStruct";
import type {DogCreateItemStruct, DogFormCreateItemStruct, DogShortItemStruct} from "~/struct/Dog/DogItemStruct";
import BreedersSitePetsAdd from "~/components/Breeders/BreedersSite/BreedersSitePetsAdd.vue";
import {useAuthStore} from "~/stores/auth.store";

const props = defineProps({
  dogs: {
    type: Object as PropType<DogShortItemStruct[] | null>,
    default: null,
  },
  typeAction: {
    type: String as PropType<'view' | 'create' | 'change'>,
    default: 'view'
  },
})
const emits = defineEmits(['sendDogs'])

const authStore = useAuthStore()

const newDogsList = ref<DogFormCreateItemStruct[]>([])
const userFullData = computed(() => authStore.userFullData )

const createDog = (data: DogFormCreateItemStruct) => {
  newDogsList.value.push({
    name: data.name,
    breed: data.breed,
    date_birth: data.date_birth,
    //owner: 0,
    approximate_age: data.approximate_age,
    //date_birth: data.date_birth,
    gender: data.gender,
    photos: data.photos
  })
}
const sendData = () => {
  const resultDogsList: DogCreateItemStruct[] = newDogsList.value?.map(data => {
    return {
      name: data.name,
      breed_id: data.breed.value,
      date_birth: data.date_birth,
      approximate_age: data.approximate_age,
      gender: data.gender,
      photos: data.photos,
    }
  })
  return resultDogsList
}
defineExpose({
  sendData,
});
</script>

<template>
  <div class="breeder-site__pets">

    <div v-if="dogs || typeAction === 'create'" class="breeder-site__pets-list">
      <CardDogsItem
          class="breeder-site__pets-item"
          v-for="(item, index) in dogs"
          :key="index"
          :item="item" />
      <CardDogsItem
          class="breeder-site__pets-item"
          v-for="(itemNew, indexNew) in newDogsList"
          :key="indexNew"
          :item="itemNew" />
      <BreedersSitePetsAdd v-if="typeAction !== 'view'" @create="createDog"/>

    </div>
    <CommonEmptyBlock v-else-if="typeAction === 'view'" text="Питомцы не найдены" mini-style/>
  </div>
</template>

<style scoped lang="scss">
.breeder-site__pets {
  &-list {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    &-item {
      &:nth-child(n) {
        //transition: round(20deg);
      }
      &:nth-child(4n-1) {
        //margin-right: 50%;
      }
      &:nth-child(2n-1) {
        //margin-bottom: 50%;
      }
    }
  }
}

</style>