<script setup lang="ts">

import CardDogsItem from "~/components/Card/CardDogsItem.vue";
import {computed, type PropType} from "vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import type {BreederSiteItemStruct} from "~/struct/Breeder/BreederSiteStruct";
import type {
  DogChangeItemStruct,
  DogCreateItemStruct,
  DogFormCreateItemStruct, DogItemStruct,
  DogShortItemStruct
} from "~/struct/Dog/DogItemStruct";
import BreedersSitePetsAdd from "~/components/Breeders/BreedersSite/BreedersSitePetsAdd.vue";
import {useAuthStore} from "~/stores/auth.store";
import BreedersSitePetsManageModal from "~/components/Breeders/BreedersSite/BreedersSitePetsManageModal.vue";

const props = defineProps({
  dogs: {
    type: Object as PropType<DogItemStruct[] | null>,
    default: null,
  },
  typeAction: {
    type: String as PropType<'view' | 'create' | 'change'>,
    default: 'view'
  },
})
const emits = defineEmits(['sendDogs'])
//const dogs = defineModel<(DogCreateItemStruct | DogItemStruct)[] | null>({default: null})
//const dogsChanged = defineModel<(DogChangeItemStruct | undefined)[] | null>('changed', { default: null})

const authStore = useAuthStore()

const newDogsList = ref<DogFormCreateItemStruct[]>([])
const changeDogsList = ref<DogChangeItemStruct[]>([])
const userFullData = computed(() => authStore.userFullData )
const isShowModalAdd = ref(false)
const editionDog = ref<DogFormCreateItemStruct | null>(null)

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
const saveEditedDog = (data: DogChangeItemStruct, id = null as number | null) => {
  if(id && newDogsList.value) {
    newDogsList.value = newDogsList.value.map(item => {
      if ((item as DogItemStruct)?.id === id) {
        return {
          ...item,
          ...data
        }
      } else {
        return item
      }
    })
    /*if(!props.dogs) return
    if(data.status_update == 'change') {
      changeDogsList.value.find(item => {
        if(item.id === id) {
          for(let idField in data) {
            if(data[idField as keyof DogChangeItemStruct]
                !== props.dogs[idField as keyof DogChangeItemStruct]) {
              item[idField as keyof DogChangeItemStruct] = data[idField as keyof DogChangeItemStruct]
            } else {
              delete item[idField]
            }
          }
        }
      })
    }*/
    editionDog.value = null
  }
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
const closeModalAdd = () => {
  isShowModalAdd.value = false
}
const showModalAdd = () => {
  isShowModalAdd.value = true
}
const editDog = (data: DogFormCreateItemStruct) => {
  editionDog.value = data
}
const deleteDog = (index: number) => {
  newDogsList.value.splice(index, 1)
}
const cancelEditDog = () => {
  editionDog.value = null
}
onMounted(() => {
  console.log('onMounted dogs', newDogsList.value, props.dogs)
  if(props.dogs) newDogsList.value = props.dogs
  console.log('onMounted dogs 2', newDogsList.value, props.dogs)

})
defineExpose({
  sendData,
});
</script>

<template>
  <div class="breeder-site__pets">
    <CommonEmptyBlock
        v-if="typeAction == 'view' && !dogs?.length"
        text="Питомцы пока не добавлены"
        mini-style/>

    <div
        v-if="dogs || (typeAction === 'create'|| typeAction === 'change')"
        class="breeder-site__pets-list"
    >
      <CardDogsItem
          v-if="typeAction === 'view'"
          class="breeder-site__pets-item"
          v-for="(item, index) in dogs"
          :typeAction="typeAction"
          :key="index"
          :item="item"
      />
      <CardDogsItem
          v-else
          class="breeder-site__pets-item"
          v-for="(itemNew, indexNew) in newDogsList"
          :typeAction="typeAction"
          @editDog="editDog"
          @deleteDog="deleteDog(indexNew)"
          :key="indexNew"
          :item="itemNew"
      />
      <BreedersSitePetsAdd
          v-if="typeAction !== 'view'"
          :defaultData="editionDog"
          @cancel-edit="cancelEditDog"
          @create="createDog"
      />
      <BreedersSitePetsManageModal
          v-if="!!editionDog"
          @close="cancelEditDog"
          @change="saveEditedDog"
          :is-show="!!editionDog"
          :defaultData="editionDog"
          type-action="create"
      />

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