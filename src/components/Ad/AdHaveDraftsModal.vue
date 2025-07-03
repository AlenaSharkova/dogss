<script setup lang="ts">

import {computed} from "vue";
import {usePersonalStore} from "~/stores/personal.store";

const router = useRouter();
const route = useRoute();

const maxCount = ref(10)
const personalStore = usePersonalStore()

const personalAdDraftList = computed(() => personalStore.AdPersonalList?.ad_draft);
const countDrafts = computed(() => personalAdDraftList.value?.length || 0);
const isShowModal = ref(!!countDrafts)

watch(countDrafts, (newCount) => {
  isShowModal.value = !!newCount
})
const title = computed(() => countDrafts.value < maxCount.value
    ? 'У Вас имеются незаконченный объявления'
    :`У Вас 10 черновиков`
)

const subtitle = computed(() => countDrafts.value < maxCount.value
    ? 'Вы может продолжить заполнение'
    :`Выберите один из них или Удалите ненужные`
)

const closeModal = () => {
  if(countDrafts.value < maxCount.value) {
    isShowModal.value = false
  }
}
const goToDraftItem = (id: string | number) => {

  router.push(`/personal/ads/draft/${id}`)
}
</script>

<template>
  <BaseModal
      :is-show-modal="isShowModal"
      class="ad-have-drafts-modal"
      @close="closeModal"
  >
    <FormWindow v-if="personalAdDraftList?.length" without-padding modal>
      <template #title>{{title}}</template>
      <template #subtitle>{{subtitle}}</template>
      <template #default>
        <swiper
            class="ad-have-drafts-modal__swiper"
            :slidesPerView="3.5"
            :space-between="15"
            :centered-slides="false"
        >
          <swiper-slide
              class="ad-have-drafts-modal__slide"
              v-for="item in personalAdDraftList"
              :key="item.id"
          >
            <CardAdItem

                :item="item"
                @click="goToDraftItem(item.id)"
            />
          </swiper-slide>
        </swiper>
      </template>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.ad-have-drafts-modal {
  &__swiper {
    padding: 25px;
    width: 100%;

  }
  &__slide {
      display: flex;
      align-items: center;
      @media (max-width: $xs) {
        width: auto;
      }
    }
}
</style>