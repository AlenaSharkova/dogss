<script setup lang="ts">

import {useAuthStore} from "~/stores/auth.store";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import CardAdItem from "~/components/Card/CardAdItem.vue";

const router = useRouter();
const route = useRoute();
const personalStore = usePersonalStore()

const authStore = useAuthStore()

const favoritesList = computed(() => personalStore.FavoritesList)

</script>

<template>
  <div class="personal-ad">
    <div class="personal-ad__row">
      <AdWrapperList :empty="!favoritesList?.length">
        <CardAdItem
            v-for="item in favoritesList"
            :key="item.id"
            :item="item" />
      </AdWrapperList>
      <!--TODO: либо рекоменации, либо инфа, с предолжением пеерйти в каталог и что-то выбрать-->

    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-ad {
  &__row {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>