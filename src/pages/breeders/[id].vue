<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import {useAdStore} from "~/stores/ad.store";
import CardAdItem from "~/components/Card/CardAdItem.vue";
import {Autoplay, EffectCoverflow} from "swiper/modules";
import BreedersSiteHead from "~/components/Breeders/BreedersSite/BreedersSiteHead.vue";
import BaseIconPaws from "~/components/Base/BaseIcon/BaseIconPaws.vue";

definePageMeta({
  requirementUser : null
})
const route = useRoute();
const idBreeder = ref<string | null>(null)

const usersStore = useUsersStore()
const breedsStore = useBreedsStore()
usersStore.updateUsersList()
//breedsStore.updateBreedsList()

const usersData = computed(() => usersStore.usersData )
const breedsList = computed(() => breedsStore.breedsList )
const pawsCount = ref(1)
const selectBreed = ref({
  value: 0,
  text: ''
})

idBreeder.value = route.params.id as string

usersStore.getUserViewData(idBreeder.value)


onMounted(() => {

  window.addEventListener('scroll', () => {
    const pageClientHeight = document.querySelector('.page-breeder')?.clientHeight
    if(pageClientHeight) {
      pawsCount.value = Math.round((window.scrollY) / 48 * (1 + (window.innerHeight + 93) / pageClientHeight)) || 1
      //console.log(window.scrollY, pageClientHeight, pawsCount.value)
    }
    //pawsCount.value = Math.ceil((window.pageYOffset +window.innerHeight/2 )/ 50)
  })
})

const adStore = useAdStore()
adStore.updateAdList()

const updateList = () => {
  adStore.updateAdList()
}

const adList = computed(() => adStore.adCatalogList )

</script>

<template>
  <div class="page-breeder">
    <div class="page-breeder__row">
      <BreedersSiteHead :title="`Питомник ${usersData?.name}`" />
      <div class="page-breeder__title">
        <h1>Питомник {{usersData?.name}}</h1>
      </div>

      <base-select v-if="breedsList?.length" :items="breedsList" v-model="selectBreed" name="breed" multiple/>
      <div class="page-breeder__gallery">
        <swiper
            class="page-breeder__gallery-swiper"
            :effect="'coverflow'"
            :grabCursor="true"
            :loopPreventsSliding="true"
            :loop="true"
            :loopedSlides ="3"
            :loopAdditionalSlides ="true"
            :centered-slides="true"
            :speed="1300"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :modules="[EffectCoverflow, Autoplay]"
            :slidesPerView="1.5"
            :coverflowEffect='{
              "rotate": 50,
              "stretch": 0,
              "depth": 100,
              "modifier": 1,
              "slideShadows": true
            }'
            :breakpoints='{
              768: {
                slidesPerView: "auto"
              }
            }'
        >
            <swiper-slide
                class="page-breeder__gallery-swiper__slide"
                v-for="i in 7"
            >
              <img :src="`/server/image/users/1/${i}.jpg`">
            </swiper-slide>
        </swiper>
      </div>
      <div class="page-breeder__content">
        Мои собаки
        <AdWrapperList>
          <CardAdItem
              v-for="(item, index) in adList"
              :key="index"
              :item="item" />
        </AdWrapperList>

      </div>
      {{usersData}}
    </div>

    <div class="page-breeder__paws">
      <TransitionGroup name="fade">

        <div v-if="false" class="page-breeder__paws-item"
             v-for="i in pawsCount"
             :key="i">
          <BaseIconPaws class="page-breeder__paws-item__icon"/>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-breeder {
  //display: flex;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &__paws {
    top: 0px;
    height: 100%;
    position: absolute;
    z-index: 0;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    transform-origin: center top;


    transform: rotate(-15deg);
    @media (max-width: $xs) {
      transform: rotate(-4deg);

      //min-width: 50px;
    }
    &-item {
      &:nth-child(2n) {
        margin-left: auto;
      }
      &__icon {
        width: 50px;
        height: 50px;
        transform: rotate(180deg);
        opacity: 0.5;
        @media (max-width: $xs) {
          width: 50px;
          height: 50px;
        }
      }

    }
  }
  &__row {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 200px;
  }

  &__title {
    padding: 0 50px;
    @include h1;
    margin-top: 40px;

    @media (max-width: $xs) {
      padding: 0 20px;
      margin-top: 15px;
    }
  }
  &__gallery {
    position: relative;
    z-index: 2;
    width: 100%;
    @media (max-width: $sm) {
      width: 100%;
      height: auto;

    }
    &-swiper {
      padding: 25px 0;
      width: 100%;
      &__slide {
        width: 500px;
        display: flex;
        align-items: center;
        @media (max-width: $xs) {
          width: auto;
        }
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    img {
      width: 100%;
      height: auto;
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

.page-breeder__gallery-swiper {
  .swiper-wrapper {
    align-items: center;
  }
}
</style>