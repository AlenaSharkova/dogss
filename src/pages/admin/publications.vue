<script setup lang="ts">
import {computed} from "vue";
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import CardAdItem from "~/components/Card/CardAdItem.vue";
import {useAdminStore} from "~/stores/admin.store";

const adminStore = useAdminStore()

const tabs = ref([
  {
    text: "Модерация",
    value: "moderation",
  },
  {
    text: "Блокированные",
    value: "blocked",
  },
])

const activeTabs = ref({value: 'moderation'})

const adListAdminActive = computed(() => {
  if(!adminStore.adListAdmin) return
  switch (activeTabs.value.value) {
    case 'moderation':
      return adminStore.adListAdmin?.moderation
    case 'blocked':
      return adminStore.adListAdmin?.blocked
    default:
      return adminStore.adListAdmin?.blocked
  }
} )

const publish = async (id: string) => {
  await adminStore.changeAd({}, id, 'active')
}
const blocking = async (id: string) => {
  await adminStore.changeAd({}, id, 'blocked')
}

onMounted(() => {
  adminStore.updateAdList()
})
</script>

<template>
  <div class="page-admin-publications">
    <LayoutWrapperPage>
      {{activeTabs}}

      <h3 class="page-admin-publications__title">Управление объявлениями</h3>
      <BaseTabSwitch class="page-admin-publications__tabs" name="admin-ads" :items="tabs" v-model="activeTabs" />
      <div v-if="adListAdminActive?.length" class="page-admin-publications__list">
        <AdWrapperList>
          <div
              class="page-admin-publications__item"
              v-for="(item, index) in adListAdminActive"
              :key="index">
            <div class="page-admin-publications__item-actions">
              <BaseButton text="Опубликовать" size="small" @click="publish(item.id)" />
              <BaseButton text="Заблокировать" type="secondary" size="small" @click="blocking(item.id)"  />
            </div>
            <CardAdItem
                :item="item" />
          </div>
        </AdWrapperList>
      </div>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-admin-publications {
  width: 100%;
  &__title {
    @include h2;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  &__tabs {
    margin-bottom: 40px;
  }
  &__item {
    overflow: hidden;
    &-actions {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
  }
}
</style>