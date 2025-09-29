<script setup lang="ts">

import {useAuthStore} from "~/stores/auth.store";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import {usePersonalAdStore} from "~/stores/personal-ad.store";
import CardAdItem from "~/components/Card/CardAdItem.vue";

const router = useRouter();
const route = useRoute();
const personalStore = usePersonalStore()
const personalAdStore = usePersonalAdStore()
const authStore = useAuthStore()

const personalAdActiveList = computed(() => personalAdStore.AdPersonalList?.ad_active);
const personalAdDraftList = computed(() => personalAdStore.AdPersonalList?.ad_draft);
const personalAdArchiveSuccessList = computed(() => personalAdStore.AdPersonalList?.ad_archive_success);
const personalAdArchiveCloseList = computed(() => personalAdStore.AdPersonalList?.ad_archive_close);
const personalAdModerationList = computed(() => personalAdStore.AdPersonalList?.ad_moderation);
const tabTypeAdList = computed( () => [
  {
    text: `Активные`,
    value: 'active',
    details: {
      count: personalAdActiveList.value?.length || 0
    }
  },
  {
    text: `Черновики`,
    value: 'draft',
    details: {
      count: personalAdDraftList.value?.length || 0
    }
  },
  {
    text: `Завершённые`,
    value: 'archive-success',
    details: {
      count: personalAdArchiveSuccessList.value?.length || 0
    }
  },
  {
    text: `Закрытые`,
    value: 'archive-close',
    details: {
      count: personalAdArchiveCloseList.value?.length || 0
    }
  },
  {
    text: `На модерации`,
    value: 'moderation',
    details: {
      count: personalAdModerationList.value?.length || 0
    }
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
  router.push(`/personal/publications/change/${id}?type=draft`)
}

watch(() => selectTabTypeAd.value?.value,
    (newTabValue, oldValue) => {
      //router.hasRoute("#active")
      router.push({query: {type: newTabValue } })
    })


const emptyBlock = computed(() => {
  switch (selectTabTypeAd.value.value) {
    case 'active': return !personalAdActiveList.value?.length
    case 'draft': return !personalAdDraftList.value?.length
    case 'archive-success': return !personalAdArchiveSuccessList.value?.length
    case 'archive-close': return !personalAdArchiveCloseList.value?.length
    case 'moderation': return !personalAdModerationList.value?.length
    default: return true
  }
})

</script>

<template>
  <div class="personal-ad">
    <div class="personal-ad__row">
      {{selectTabTypeAd}}
      {{personalAdModerationList}}

      <BaseTabSwitch :items="tabTypeAdList" name="personal-publications" v-model="selectTabTypeAd" />
      <BaseButton
          class="header-nav__actions-ad"
          text="Подать новое объявление"
          type="secondary"
          size="small"
          to="/create-ad" />
      <AdWrapperList :empty="emptyBlock">
        <template v-if="selectTabTypeAd?.value === 'active'">
          <CardAdItem
              v-for="item in personalAdActiveList"
              :key="item.id"
              :item="item"
              type="personal"
          />
        </template>
        <template v-if="selectTabTypeAd?.value === 'draft'">
          <CardAdItem
              v-for="item in personalAdDraftList"
              :key="item.id"
              :item="item"
              type="personal"
              @click="goToDraftItem(item.id)"
          />
        </template>
        <template v-else-if="selectTabTypeAd?.value === 'archive-success'">
          <CardAdItem
              v-for="item in personalAdArchiveSuccessList"
              :key="item.id"
              :item="item"
              type="personal"
          />
        </template>
        <template v-else-if="selectTabTypeAd?.value === 'archive-close'">
          <CardAdItem
              v-for="item in personalAdArchiveCloseList"
              :key="item.id"
              :item="item"
              type="personal"
          />
        </template>
        <template v-else-if="selectTabTypeAd?.value === 'moderation'">
          <CardAdItem
              v-for="item in personalAdModerationList"
              :key="item.id"
              :item="item"
              type="personal"
          />
        </template>

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