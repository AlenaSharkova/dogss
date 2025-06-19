<script setup lang="ts">

import {useAuthStore} from "~/stores/auth.store";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import CartAdItem from "~/components/Cart/CartAdItem.vue";

const router = useRouter();
const route = useRoute();
const personalStore = usePersonalStore()
const authStore = useAuthStore()

const favoritesList = computed(() => personalStore.FavoritesList)

</script>

<template>
  <div class="profile-ad">
    <div class="profile-ad__row">
      <AdWrapperList>
        <CartAdItem
            v-for="item in favoritesList"
            :key="item.id"
            :item="item" />
      </AdWrapperList>
      <div v-if="!favoritesList?.length" class="page-ads-favorite__empty">
        <p> У Вас нет избранных объявления </p>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-ad {
  &__row {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>