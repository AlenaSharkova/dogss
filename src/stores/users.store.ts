import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import UsersService from '~/service/users.service';
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {useCommonStore} from "~/stores/common.store";


export const useUsersStore = defineStore('usersStore', () => {
  const config = useRuntimeConfig();
  const commonStore = useCommonStore()

  const usersService = new UsersService(config.public.apiBaseUrl);

  let usersList = ref<AdItemStruct[] | null>(null)
  const userData = ref<AdItemStruct | null>(null)

    async function updateUsersList() {
        await usersService
        .getUsersList()
        .then((res) => {
            if (res) usersList.value = res;
          console.log('usersList in store', usersList.value, res)

        })
          .catch(e => {
              commonStore.addUserErrorAlert(e.data?.statusMessage)
              commonStore.addUserErrorAlert(e.data?.message, true)
              throw e.data
          });
  }

  async function getUsersData(id: string | number) {
      await usersService
        .getUsersData(id)
        .then((res) => {
          if (res) userData.value = res.value;
        })
          .catch(e => {
              commonStore.addUserErrorAlert(e.data?.statusMessage)
              commonStore.addUserErrorAlert(e.data?.message, true)
              throw e.data
          });
        /*.finally(() => (isLoading.value = false));*/
  }

  return {
      usersList,
      updateUsersList,
      getUsersData,
      userData
  }
})
