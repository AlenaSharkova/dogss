import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import UsersService from '~/service/users.service';
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";


export const useUsersStore = defineStore('usersStore', () => {
  const config = useRuntimeConfig();

  const usersService = new UsersService(config.public.apiBaseUrl);

  let usersList = ref<AdItemStruct[] | null>(null)
  const userData = ref<AdItemStruct | null>(null)

    async function updateUsersList() {
        await usersService
        .getUsersList()
        .then((res) => {
            if (res) usersList.value = res.value;
          console.log('usersList in store', usersList.value, res, res.value)

        })
          .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
  }

  async function getUsersData(id: string | number) {
      await usersService
        .getUsersData(id)
        .then((res) => {
          if (res) userData.value = res.value;
        })
          .catch(e => console.error(e));
        /*.finally(() => (isLoading.value = false));*/
  }

  return {
      usersList,
      updateUsersList,
      getUsersData,
      userData
  }
})
