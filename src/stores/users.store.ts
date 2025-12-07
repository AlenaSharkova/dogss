import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import UsersService from '~/service/users.service';
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import {useCommonStore} from "~/stores/common.store";
import type {UserItemPublicPreviewStruct, UserItemPublicStruct} from "~/struct/User/UserItemStruct";


export const useUsersStore = defineStore('usersStore', () => {
  const config = useRuntimeConfig();
  const commonStore = useCommonStore()

  const usersService = new UsersService(config.public.apiBaseUrl);

  let usersList = ref<UserItemPublicPreviewStruct[] | null>(null)
  const userViewData = ref<UserItemPublicStruct | null>(null)
  const userForBreederViewData = ref<UserItemPublicStruct | null>(null)

    async function updateUsersList() {
        await usersService
        .getUsersList()
        .then((res) => {
            if (res) usersList.value = res;
            else {
                commonStore.addUserErrorAlert('Упс, Ошибка загрузки данных каталога..')
            }
          console.log('usersList in store', usersList.value, res)

        })
          .catch(e => {
              commonStore.addUserErrorAlert(e.data?.statusMessage)
              commonStore.addUserErrorAlert(e.data?.message, true)
              throw e.data
          });
  }

  async function getUserViewData(id: string | number, isForBreeder = false) {
      await usersService
        .getUserData(id)
        .then((res) => {
          if (res) {
              if(isForBreeder) userForBreederViewData.value = res;
              else userViewData.value = res;
          } else {
              commonStore.addUserErrorAlert('Упс, Ошибка загрузки данных пользователя..')
              userForBreederViewData.value = null
              userViewData.value = null
          }
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
      getUserViewData,
      userViewData,
      userForBreederViewData
  }
})
