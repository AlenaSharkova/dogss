import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import BreedsService from '~/service/breeds.service';
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";
import {useCommonStore} from "~/stores/common.store";


export const useBreedsStore = defineStore('breedsStore', () => {
  const config = useRuntimeConfig();
  const commonStore = useCommonStore()

  const breedsService = new BreedsService(config.public.apiBaseUrl);

  let breedsList = ref<ISelectComponent[] | null>(null)

    async function updateBreedsList() {
        await breedsService
        .getBreedsList()
        .then((res) => {
            if (res) breedsList.value = res;
          console.log('breedsList in store', breedsList.value, res)

        })
          .catch(e => {
              commonStore.addUserErrorAlert(e.data?.statusMessage)
              commonStore.addUserErrorAlert(e.data?.message, true)
              throw e.data
          });
  }

  return {
      breedsList,
      updateBreedsList
  }
})
