<script setup lang="ts">

import {computed} from "vue";
import {usePersonalStore} from "~/stores/personal.store";
import {usePersonalAdStore} from "~/stores/personal-ad.store";
import {useCommonStore} from "~/stores/common.store";

const router = useRouter();
const route = useRoute();

const maxCount = ref(10)
const personalStore = usePersonalStore()
const personalAdStore = usePersonalAdStore()
const commonStore = useCommonStore()

const personalAdDraftList = computed(() => personalAdStore.AdPersonalList?.ad_draft);
const countDrafts = computed<number>(() => personalAdDraftList.value?.length || 0);
const isShowModal = ref(!!countDrafts.value)

const title = computed(() => countDrafts.value < maxCount.value
    ? 'У Вас имеются незаконченный объявления'
    :`У Вас 10 черновиков`
)

const subtitle = computed(() => countDrafts.value < maxCount.value
    ? 'Вы может продолжить их заполнение'
    :`Выберите один из них или Удалите ненужные`
)

const closeModal = () => {
  if(countDrafts.value < maxCount.value) {
    isShowModal.value = false
  }
}
const goToDraftItem = (id: string | number) => {
  router.push(`/personal/publications/change/${id}?type=draft`)
}

const deleteAllDrafts = async () => {
  await personalAdStore.deletePersonalAd("draft").then(() => {
    commonStore.addUserSuccessAlert('Черновики успешно удалены')
  }).catch(() => {
    commonStore.addUserErrorAlert('Ошибка удаления черновиков')
  })
}
watch(() => countDrafts.value,
    (newCount) => {
      isShowModal.value = !!newCount
    }
)
</script>

<template>
  <BaseModal
      :is-show-modal="isShowModal"
      class="ad-have-drafts-modal"
      @close="closeModal"
  >
    <FormWindow without-padding modal>
      <template #title>{{title}} //{{countDrafts}}</template>
      <template #subtitle>{{subtitle}}</template>
      <template #default>
        <div v-if="personalAdDraftList?.length" class="ad-have-drafts-modal__block">

          <div class="ad-have-drafts-modal__action">
            <BaseButton v-if="countDrafts < maxCount" size="small" class="ad-have-drafts-modal__action-btn" type="secondary" text="Продолжить с новым объявлением" @click="closeModal" />
            <BaseButton size="small" class="ad-have-drafts-modal__action-btn" type="violet" text="Удалить черновики" @click="deleteAllDrafts"  />
          </div>
          <swiper
              class="ad-have-drafts-modal__swiper"
              slidesPerView="auto"
              :space-between="15"
              :centered-slides="false"
              direction="vertical"
              :slidesPerGroup="1"

              :breakpoints="{
                1025: {
                  direction: 'horizontal',
                  spaceBetween: 15,
                  slidesPerView: 3.5,
                  slidesPerGroup: 2,
                },
                600: {
                  direction: 'horizontal',
                  spaceBetween: 15,
                  slidesPerView: 'auto',
                  slidesPerGroup: 1,

                }
              }"
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
        </div>
        <div v-else>
          пусто
        </div>
      </template>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.ad-have-drafts-modal {
  &__action {
    position: sticky;
    z-index: 20;
    top: 0;
    display: flex;
    gap: 10px;
    padding: 0 40px 10px;
    justify-content: flex-end;
    background: $white-gradient;

    @media (max-width: $sm) {
      padding: 0 20px 15px;
      //flex-direction: column;
    }
  }
  &__swiper {
    padding: 25px;
    width: 100%;
    @media (max-width: $xs) {
    }
    @media (max-width: $xss) {

    }


  }
  &__slide {
      display: flex;
      align-items: center;
      @media (max-width: $sm) {
        height: auto;
      }
    }
}
</style>
<style lang="scss">
.ad-have-drafts-modal {
  &__swiper {
    .swiper-wrapper {
      @media (max-width: $sm) {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        gap: 10px;
      }
      @media (max-width: $xs) {
        display: grid;
        grid-template-columns: 50% 50%;
        gap: 10px;
      }
    }
  }
}
</style>