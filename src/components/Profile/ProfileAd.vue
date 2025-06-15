<script setup lang="ts">

import {useAuthStore} from "~/stores/auth.store";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";

const router = useRouter();
const route = useRoute();
const personalStore = usePersonalStore()
const authStore = useAuthStore()

const personalAdActiveList = computed(() => personalStore.AdPersonalList?.ad_active);
const personalAdDraftList = computed(() => personalStore.AdPersonalList?.ad_draft);
const tabTypeAdList = computed( () => [
  {
    text: `Активные ( ${personalAdActiveList.value?.length || 0} )`,
    value: 'active',
  },
  {
    text: `Черновики ( ${personalAdDraftList.value?.length || 0} )`,
    value: 'draft',
  }
])
const selectTabTypeAd = ref(tabTypeAdList.value.find(item =>
    route.query.type === item.value
))

if(!selectTabTypeAd.value) {
  throw createError({
    statusCode: 404,
  })
}

const goToDraftItem = (id: string | number) => {
  router.push(`/profile/ads/draft/${id}`)
}

watch(() => selectTabTypeAd.value?.value,
    (newTabValue, oldValue) => {
      //router.hasRoute("#active")
      router.push({query: {type: newTabValue } })
    })

</script>

<template>
  <div class="profile-ad">
    <div class="profile-ad__row">
      <BaseTabSwitch :items="tabTypeAdList" v-model="selectTabTypeAd" />
      <AdWrapperList>
        <CartAdItem
            v-if="selectTabTypeAd?.value === 'active'"
            v-for="item in personalAdActiveList"
            :item="item" />
        <CartAdItem
            v-if="selectTabTypeAd?.value === 'draft'"
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