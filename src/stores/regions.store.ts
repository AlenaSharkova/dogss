import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import RegionsService from '~/service/regions.service';
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {ISelectComponent, ISelectComponentWithChildren} from "~/struct/Common/ISelectComponent";
import {fa} from "cronstrue/dist/i18n/locales/fa";


export const useRegionsStore = defineStore('regionsStore', () => {
  const config = useRuntimeConfig();

  const regionsService = new RegionsService(config.public.apiBaseUrl);

  let regionsList = ref<ISelectComponent[] | null>(null)
  let cityList = ref<ISelectComponent[] | null>(null)
  let regionsListFull = ref<ISelectComponentWithChildren[] | null>(null)

    async function updateRegionsListFull() {
        await regionsService
        .getRegionsList()
        .then((res) => {
            if (res) regionsListFull.value = res.value;
          console.log('regionsListFull in store', regionsList.value, res, res.value)

        })
          .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }
    async function updateRegionsList() {
        await regionsService
        .getRegionsList(true)
        .then((res) => {
            if (res) regionsList.value = res.value;
          console.log('regionsList in store', regionsList.value, res.value)

        })
          .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }
    async function getCityList(regionValue: number) {
        if(!regionValue) return
        await regionsService
        .getRegionsList(false, regionValue)
        .then((res) => {
            if (res) cityList.value = res.value;
          console.log('cityList in store', cityList.value, res, res.value)

        })
          .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
    }

  return {
      regionsList,
      regionsListFull,
      cityList,
      getCityList,
      updateRegionsList,
      updateRegionsListFull
  }
})
