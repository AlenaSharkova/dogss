<script setup lang="ts">

import {useAuthStore} from "~/stores/auth.store";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import {usePersonalAdStore} from "~/stores/personal-ad.store";

const router = useRouter();
const route = useRoute();
const personalStore = usePersonalStore()
const personalAdStore = usePersonalAdStore()
const authStore = useAuthStore()

const personalAdActiveList = computed(() => personalAdStore.AdPersonalList?.ad_active);
const personalAdDraftList = computed(() => personalAdStore.AdPersonalList?.ad_draft);
const personalAdArchiveList = computed(() => personalAdStore.AdPersonalList?.ad_archive);
const personalAdModerationList = computed(() => personalAdStore.AdPersonalList?.ad_moderation);
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
  },
  {
    text: `На модерации ( ${personalAdModerationList.value?.length || 0} )`,
    value: 'moderation',
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
      <AdWrapperList>
        <CardAdItem
            v-if="selectTabTypeAd?.value === 'active'"
            v-for="item in personalAdActiveList"
            :key="item.id"
            :item="item"
            type="personal"
        />
        <!--пустой список common-->
        <template v-if="selectTabTypeAd?.value === 'draft'">
          <CardAdItem
              v-for="item in personalAdDraftList"
              :key="item.id"
              :item="item"
              type="personal"
              @click="goToDraftItem(item.id)"
          />
        </template>
        <template v-else-if="selectTabTypeAd?.value === 'archive'">
          <CardAdItem
              v-for="item in personalAdArchiveList"
              :key="item.id"
              :item="item"
              type="personal"
          />
        </template>
        <CardAdItem
            v-if="selectTabTypeAd?.value === 'moderation'"
            v-for="item in personalAdModerationList"
            :key="item.id"
            :item="item"
            type="personal"
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