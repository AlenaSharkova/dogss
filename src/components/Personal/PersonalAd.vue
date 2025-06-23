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
const personalAdArchiveList = computed(() => personalStore.AdPersonalList?.ad_archive);
const tabTypeAdList = computed( () => [
  {
    text: `Активные ( ${personalAdActiveList.value?.length || 0} )`,
    value: 'active',
  },
  {
    text: `Черновики ( ${personalAdDraftList.value?.length || 0} )`,
    value: 'draft',
  },
  {
    text: `Архив ( ${personalAdArchiveList.value?.length || 0} )`,
    value: 'archive',
  }
])

const activeTab = ref(tabTypeAdList.value.find(item =>
    route.query.type === item.value
))
if(!activeTab.value) {
  router.push({query: {type: 'active' } })
  activeTab.value = tabTypeAdList.value[0]
}
const selectTabTypeAd = ref(activeTab.value)


const goToDraftItem = (id: string | number) => {

  router.push(`/personal/ads/draft/${id}`)
}

watch(() => selectTabTypeAd.value?.value,
    (newTabValue, oldValue) => {
      //router.hasRoute("#active")
      router.push({query: {type: newTabValue } })
    })




</script>

<template>
  <div class="personal-ad">
    <div class="personal-ad__row">
      <BaseTabSwitch :items="tabTypeAdList" v-model="selectTabTypeAd" />
      <BaseButton
          class="header-nav__actions-ad"
          text="Подать новое объявление"
          type="secondary"
          size="small"
          to="/create-ad" />
      <AdWrapperList>
        <CartAdItem
            v-if="selectTabTypeAd?.value === 'active'"
            v-for="item in personalAdActiveList"
            :key="item.id"
            :item="item"
        />
        <!--пустой список common-->
        <CartAdItem
            v-if="selectTabTypeAd?.value === 'draft'"
            v-for="item in personalAdDraftList"
            :key="item.id"
            :item="item"
            @click="goToDraftItem(item.id)"
        />
        <CartAdItem
            v-if="selectTabTypeAd?.value === 'archive'"
            v-for="item in personalAdArchiveList"
            :key="item.id"
            :item="item"
            @click="goToDraftItem(item.id)"
        />
      </AdWrapperList>
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