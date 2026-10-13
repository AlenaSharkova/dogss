<script setup lang="ts">

import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
definePageMeta({
  requirementUser : null
})
const usersStore = useUsersStore()
const usersList = computed(() => usersStore.usersList )
usersStore.updateUsersList()
</script>

<template>
    <div class="page-breeders-group">
      <LayoutWrapperPage>
        <h1 class="page-breeders-group__title" >Заводчики</h1>
        <div class="page-breeders-group__list">
          <CardBreederItem
              v-for="(user, index) in usersList"
              :key="index"
              class="page-breeders__list-item"
              :user="user" />
        </div>
      </LayoutWrapperPage>
    </div>
</template>

<style scoped lang="scss">
.page-breeders-group {
  width: 100%;
  margin-top: 30px;
  &__title {
    @include h2;
    margin: 25px 0 20px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>