<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import {useAdStore} from "~/stores/ad.store";
import { FreeMode, Navigation, Thumbs, Mousewheel} from 'swiper/modules';
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
import useScreen from "~/utils/useScreen";
import UserContactMethodsView from "~/components/User/UserContactMethodsView.vue";
import type Swiper from "swiper";
import type {UserContactMethodsOptimalStruct} from "~/struct/User/UserItemStruct";
import AdStarsSelect from "~/components/Ad/AdStarsSelect.vue";

definePageMeta({
  requirementUser : 'authorized'
})
const route = useRoute();

const adCommentStore = useAdCommentStore()
const authStore = useAuthStore()

const hashPublication = ref<string | null>(null)
hashPublication.value = route.params.id as string
const comment = ref('')
const activeStarts = ref(0)

const adForComment = computed(() => adCommentStore.adForComment )
const notAccess = () => {
  throw createError({
    statusCode: 401,
    message: 'Нет доступа',
    statusMessage: 'Нет доступа',
  })
}
const sendComment = async () => {
  if(!hashPublication.value || !authStore.userFullData) return
  await adCommentStore.sendComment({
    id_user_commenter: authStore.userFullData.id,
    hash_link_comment: hashPublication.value,
    text_comment: comment.value || '',
    rating_commenter: activeStarts.value,
  })
}

onMounted(async () => {
  if(!hashPublication.value || (hashPublication.value?.length || 0) < 20) {
    notAccess()
    return
  }
  await adCommentStore.getAdForComment(hashPublication.value)
  if(!adCommentStore.adForComment) {
    notAccess()
  }
})
</script>

<template>
  <div v-if="adForComment" class="page-comment-publication">
    <LayoutWrapperPage>
      <div class="page-comment-publication__title">
        <span>Вы можете оставить комментарий</span>
      </div>
      <div class="page-comment-publication__row">

        <div class="page-comment-publication__card">
          <CardAdItem
              :item="adForComment"
          />
        </div>
        <div class="page-comment-publication__main">

          <AdStarsSelect v-model="activeStarts"/>

          <BaseTextarea v-model="comment" title="Ваш отзыв" :maxLength="200" show-fullnes></BaseTextarea>
          <BaseButton text="Отправить" @click="sendComment" :disabled="!activeStarts" />
        </div>
      </div>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-comment-publication {
  width: 100%;
  //display: flex;
  gap: 20px;
  position: relative;

  &__title {
    @include h1;
    margin-top: 40px;

    @media (max-width: $xs) {
      margin-top: 15px;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-start;
    flex: 1;
    margin-top: 40px;
    @media (max-width: $sm) {
      flex-direction: column;
      align-items: center;
    }

  }
  &__card {
    flex: 1;
    max-width: 300px;
    @media (max-width: $sm) {
      max-width: 400px;
      width: 100%;
    }
  }
  &__main {
    flex: 1;
    order: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__gallery {
    flex-shrink: 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 50px;
    @media (max-width: $sm) {
     // grid-template-columns: 1fr 1fr;
      //display: grid;
      align-items: stretch;
      margin-bottom: 20px;
    }
    @media (max-width: $xs) {
      gap: 7px;
    }

    &-item {
      &.--main {
        width: 500px;
        border-radius: 10px;
        overflow: hidden;
        @media (max-width: $md) {
          width: 450px;
        }
        @media (max-width: $sm) {
          width: auto;
        }
        .page-publication__gallery-swiper {

          &__slide {
            img {
              aspect-ratio: 1;

              border-radius: 10px;
              box-shadow: $box-shadow-lite;
            }
          }
        }
      }
      &.--addition {



        width: 100px;
        height: 500px;
        @media (max-width: $md) {
          height: 450px;
        }
        @media (max-width: $sm) {
          //grid-column: 2;
          //grid-row: 1;

          //overflow: hidden;

          //flex: 1;

          height: auto;
          aspect-ratio: 1 / 4;

          flex-shrink: 0;

          //height: auto;
          //flex-shrink: 0;
          width: calc(20% - 20px)
          //max-width: 100px;
          //min-width: 50px;
          //max-height: 450px;
          //min-height: 200px;

        }

        .page-publication__gallery-swiper {
          height: 100%;
          width: 100%;
          flex: 0;


          &__slide {

            //width: 500px;
            //height: 400px;
            opacity: 0.6;
            transition: all 0.4s;
            cursor: pointer;
            @media (max-width: $sm) {
              height: 25%;
              margin-bottom: 9px;
              flex: 0 0 auto;
              &:last-child {
                margin-bottom: 0;
              }
            }

            img {
              border-radius: 10px;
              box-shadow: $box-shadow-lite;
              //height: 100%;
              //width: auto;
              height: 100%;
              object-fit: cover;
              object-position: center;
              @media (max-width: $sm) {
                height: 100%;
              }
            }
          }
        }
      }
    }

    @media (max-width: $sm) {
      width: 100%;
      height: auto;

    }
    &-swiper {
      width: 100%;

      &__slide {
        display: flex;
        align-items: center;
        @media (max-width: $sm) {
          width: auto;
        }
        img {
          //height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  &__details {
    @media (max-width: $sm) {
      width: 100%;
      order: 2;
    }
    &-contacts {
      margin-top: 40px;
      &__title {
        margin-bottom: 20px;
        @include h5;
      }
    }
  }
  &__content {
    padding: 0 50px;
    @media (max-width: $md) {
      padding: 0 30px;
    }
    @media (max-width: $xs) {
      padding: 0 20px;
    }

  }
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
</style>
<style lang="scss">
</style>