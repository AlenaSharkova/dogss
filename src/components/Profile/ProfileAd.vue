<script setup lang="ts">

import {useAuthStore} from "~/stores/auth.store";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";

const router = useRouter();
const personalStore = usePersonalStore()
const authStore = useAuthStore()

const personalAdActiveList = computed(() => personalStore.AdPersonalList?.ad_active);
const personalAdDraftList = computed(() => personalStore.AdPersonalList?.ad_draft);
const tabTypeAdList = ref([
  {
    text: 'Активные',
    value: 'active',
  },
  {
    text: 'Черновики',
    value: 'draft',
  }
])
const selectTabTypeAd = ref(
  {
    text: 'Активные',
    value: 'active',
  })

const goToDraftItem = (id: string | number) => {
  router.push(`profile/ads/draft/${id}`)
}

</script>

<template>
  <div class="profile-ad">
    <div class="profile-ad__row">
      <BaseTabSwitch :items="tabTypeAdList" v-model="selectTabTypeAd" />
      <AdWrapperList>
        <CartAdItem
            v-if="selectTabTypeAd.value === 'active'"
            v-for="item in personalAdActiveList"
            :item="item" />
        <CartAdItem
            v-if="selectTabTypeAd.value === 'draft'"
            v-for="item in personalAdDraftList"
            :item="item"
            @click="goToDraftItem(item.id)"
        />
      </AdWrapperList>
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