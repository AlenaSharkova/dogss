<script setup lang="ts">

import {useUsersStore} from "~/stores/users.store";
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import {computed} from "vue";

const usersStore = useUsersStore()
const usersList = computed(() => usersStore.usersList )
usersStore.updateUsersList()
</script>

<template>
    <div class="page-breeders__list">
      <CartBreederItem
          v-for="(item, index) in usersList"
          :key="index"
          class="page-breeders__list-item"
          :item="item">
        <CartBreederItem  />
        {{item}}

      </CartBreederItem>
    </div>
</template>

<style scoped lang="scss">
.page-breeders {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>