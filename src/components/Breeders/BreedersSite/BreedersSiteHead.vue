<script setup lang="ts">

import {computed, defineProps, type PropType, ref, withDefaults} from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import {useCommonStore} from "~/stores/common.store";
import type {UserPageSectionType} from "~/struct/User/UserPageStruct";
import type {BreederSiteSectionType} from "~/struct/Breeder/BreederSiteStruct";
import BreedersSiteHeadUpload from "~/components/Breeders/BreedersSite/BreedersSiteHeadUpload.vue";
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";
import useScreen from "~/utils/useScreen";
gsap.registerPlugin(ScrollTrigger);
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  typeAction: {
    type: String as PropType< 'create' | 'change' | 'view'>,
    default: 'create'
  },
})
const emits = defineEmits(['scroll-to-block'])

const newNameFinal = defineModel('nameBreeder', {default: ''})
const photoBannerItem = defineModel<ICommonUpload | null>('bannerImages', {default: null})
const idActiveSection = defineModel<UserPageSectionType | null>('section', {default: null})
const photoPreviewItem = defineModel<ICommonUpload | null>('photoPreview', {default: null})

const commonStore = useCommonStore()
const { isRangeTablet, isMobile } = useScreen();

const tabNavList = reactive<{name: string, id: BreederSiteSectionType}[]>([
  {
    name: "О нас",
    id: "about",
  },
  {
    name: "Наши питомцы",
    id: "my-dogs",
  },
  {
    name: "Объявления",
    id: "ads",
  },
  {
    name: "Контакты",
    id: "contacts",
  },
  {
    name: "Отзывы",
    id: "comments",
  },
])

const photoBannerList = ref<ICommonUpload[]>([])
const photoPreviewList = ref<ICommonUpload[]>([])
const newNameInput = ref('')
const isShowNameInput = ref(false)
const classAdded = ref(false)
const startValue = ref('+=130px')
const targetElement = useTemplateRef<HTMLElement>('target-element')
const scrollTriggerInstance = ref<globalThis.ScrollTrigger | null>(null);
const animationInstance = ref<gsap.core.Tween | null>(null);
const isShowUploadPreviewModal = ref(false)

const isActiveIndex = computed(() => tabNavList.findIndex(tab => tab.id === idActiveSection.value))
const lineWidthTabNum = computed(() => 100 / tabNavList.length )
const lineWidthTab = computed(() => lineWidthTabNum.value +'%' )
const lineLeftTab = computed(() => isActiveIndex.value * lineWidthTabNum.value + '%' )
const styleBanner = computed(() => {
  if(photoBannerItem.value) {
    let positionStyle = 'center center'
    if(isRangeTablet.value) positionStyle = photoBannerItem.value?.positionBanner?.table || ""
    else if(isMobile.value) positionStyle = photoBannerItem.value?.positionBanner?.mobile || ""
    else positionStyle = photoBannerItem.value?.positionBanner?.desktop || ""
    return {
      'background-image': `url(${photoBannerItem.value.imageUrl})`,
      'background-position': positionStyle
    }
  }
})
const changeTab = (idSelect: string) => {
  emits('scroll-to-block', idSelect)
}
const createTrigger = async () => {
  if (scrollTriggerInstance.value) {
    scrollTriggerInstance.value.kill(); // Убиваем старый ScrollTrigger
  }
  animationInstance.value = gsap.to('.breeder-site-header__bottom-nav', {
    height: '125px',
    duration: 1,
    scrollTrigger: {
      trigger: ".breeder-site-header",
      start: `bottom +=90px`,

      end: "bottom +=90px",
      scrub: true,
      //toggleClass: { targets: targetElement.value, className: "active" },
     // markers: true, // Для отладки: показывает маркеры ScrollTrigger
      //toggleActions: "play none none reverse", // play: добавляет класс, reverse: удаляет класс
      onEnter: () => {
        classAdded.value = true
      },
      onLeaveBack: () => {
        classAdded.value = false
      },
    }

  });
}
const updateStart = () => {
  return
  // Изменяем значение start
/*
  startValue.value = `${commonStore.isHiddenHeader? '-=137px': '+=130px'}`
  console.log('`top', startValue.value, scrollTriggerInstance.value, animationInstance.value)


  // Обновляем ScrollTrigger
  scrollTriggerInstance.value.vars.start = `top ${commonStore.isHiddenHeader? '+=32px': '+=20px'}`
  animationInstance.value.invalidate().restart();
  ScrollTrigger.refresh();
*/
  //scrollTriggerInstance.value.refresh();
    //createTrigger();

    //ScrollTrigger.refresh();
};
const applyNewName = () => {
  newNameFinal.value = newNameInput.value
  console.log('applay', newNameFinal.value)
  isShowNameInput.value = false
}
const closeUploadModalPreviewModal = () => {
  isShowUploadPreviewModal.value = false
}
const showUploadPreviewModal = () => {
  isShowUploadPreviewModal.value = true
}
watch(() => commonStore.isScrolled,
    () => updateStart()
)
watch(() => photoBannerList.value,
    (newList) => {
      console.log('newList photoBannerList', newList, newList?.length, photoPreviewList.value)

      if(!newList?.length) photoBannerItem.value = null
      photoBannerItem.value = newList[0]
    }, {
      deep: true,
    }
)
watch(() => photoPreviewList.value,
    (newList) => {
      console.log('newList photoPreviewList', newList, newList?.length, photoPreviewList.value)
      if(!newList?.length) photoPreviewItem.value = null
      photoPreviewItem.value = newList[0]
    }, {
      deep: true,
    }
)

onMounted(async () => {
  photoBannerItem.value? photoBannerList.value[0] = {...photoBannerItem.value}: photoBannerList.value = []
  photoPreviewItem.value? photoPreviewList.value[0] = {...photoPreviewItem.value}: photoPreviewList.value = []
  gsap.registerPlugin(ScrollTrigger); // Убедитесь, что ScrollTrigger зарегистрирован
  console.log('targetElement.value 1', targetElement.value)
  await createTrigger()
});
onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
})
</script>

<template>
  <div class="breeder-site-header">
    <div class="breeder-site-header__block">
      <div class="breeder-site-header__image" :style="styleBanner">
        <img v-if="photoBannerItem?.imageUrl" :src="photoBannerItem?.imageUrl"/>
        <img v-else src="/image/test-dog/abce4a3bc3a9f343180cc20b81fbbeb4.webp"/>
        <div class="breeder-site-header__image-mask" />
      </div>
      <BreedersSiteHeadUpload
          v-if="props.typeAction !== 'view'"
          v-model="photoBannerList"
          class="breeder-site-header__upload"
      />
      <div class="breeder-site-header__content">
        <div class="breeder-site-header__content-name">
          <h1 v-if="props.typeAction === 'view'"
              class="breeder-site-header__content-name__text">
            {{name}}
          </h1>
          <div v-if="typeAction === 'create'" class="breeder-site-header__content-name__select">
            <h1
                class="breeder-site-header__content-name__text">
              {{newNameFinal || 'Введите название питомника'}}
            </h1>
            <div class="breeder-site-header__content-name__select-row">
              <BaseInput v-if="isShowNameInput" v-model="newNameInput" title="Название питомника" />
              <BaseButton
                  v-if="isShowNameInput"
                  text="Применить"
                  @click="applyNewName"
                  type="teriary"
                  unfull
              />
              <BaseButton
                  v-else
                  type="teriary"
                  unfull
                  :text="newNameFinal? 'Изменить': 'Ввести'"
                  @click="isShowNameInput = true"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="breeder-site-header__bottom">
        <div ref="target-element" class="breeder-site-header__bottom-nav"
             :class="{fixed: classAdded}">
          <div class="breeder-site-header__bottom-nav__row">
            <Transition name="fade">
              <div v-if="classAdded" class="breeder-site-header__bottom-nav__personal">
                <BaseProfileCircle
                    @click="showUploadPreviewModal"
                    :name="name || 'Фото Превью'"
                    size="small"
                    unfull
                    :img="photoPreviewItem?.imageUrl" />

                <CommonUploadImageModal
                    :isShow="isShowUploadPreviewModal"
                    titleModal="Загрузите баннер"
                    text-next-btn="Перейти к объявлению"
                    v-model="photoPreviewList"
                    @close="closeUploadModalPreviewModal"
                />

                <div class="breeder-site-header__bottom-nav__personal-content">
                  <div class="breeder-site-header__bottom-nav__personal-content__title">
                    <p v-if="typeAction === 'create'">{{newNameFinal || 'Введите название питомника'}}</p>
                    <p v-if="typeAction === 'view'">{{name}}</p>
                  </div>
                </div>
              </div>
            </Transition>
            <nav class="breeder-site-header__bottom-nav__list">
              <div class="breeder-site-header__bottom-nav__item"
                   v-for="tab in tabNavList"
                   :key="tab.id"
                   :class="{active: tab.id === idActiveSection}"
                   @click="changeTab(tab.id)"
              >
                <p class="breeder-site-header__bottom-nav__item-text">
                  {{tab.name}}
                </p>
              </div>
              <Transition name="fade">
                <div v-show="isActiveIndex !== -1" class="line" :style="{width: lineWidthTab, left: lineLeftTab}">
                  <div class="line-block" />
                </div>
              </Transition>
            </nav>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.breeder-site-header {
  box-sizing: border-box;
  &__block {
    height: calc(100vh - 30px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__image {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100%;
    background-image: url("/image/test-dog/abce4a3bc3a9f343180cc20b81fbbeb4.webp");
    width: 100%;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    img {
      width: 100%;
      display: none;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }
    &-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 32%);
    }
  }
  &__content {
    padding: 50px;
    @media (max-width: $sm) {
      padding: 20px;
    }

    &-name {
      @include h0;
      color: #fff;
      &__select {
        display: flex;
        flex-direction: column;
        &-row {
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  &__bottom {
    width: 100%;
    margin-top: auto;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: $violet-opacity;
    z-index: 9;
    //backdrop-filter: blur(6px);
    &-nav {
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: center;
      will-change: header;
      background-color: #47456D00;
      backdrop-filter: blur(6px);
      transition: all 0.2s;

      &.fixed {
        background-color: $violet-opacity;
        z-index: 10;
        position: fixed;
        top: 0px;
        transition: all 0.5s;

        .breeder-site-header__bottom-nav {
          &__row {
            padding-top: 34px;
          }
        }
      }

      &__row {
        width: 100%;
        padding: 24px 50px;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        gap: 0px;
        @media (max-width: $md) {
          padding: 15px 30px;
          gap: 10px;
        }
        @media (max-width: $sm) {
          padding: 15px 20px;
        }
        @media (max-width: $xs) {
          gap: 10px;
        }
      }

      &__personal {
        display: flex;
        gap: 15px;
        align-items: center;
        &-content {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-direction: column;

          &__title {
            color: $white-text;
            @include h4;
            p {
              text-wrap: nowrap;
            }
          }
        }
      }

      &__list {

        margin-left: auto;
        margin-right: auto;
        min-width: 70%;
        grid-row: 1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-auto-flow: column dense;
        gap: 0;
        position: relative;
        padding: 0;
        @media (max-width: $xs) {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 5px;
        }
      }

      &__item {
        //flex: 1;
        padding: 5px 20px 8px;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
        @media (max-width: $xs) {
          padding: 5px 5px 2px;
          position: relative;
          &:after {
            content: '';
            position: absolute;
            left: 50%;
            right: 50%;
            bottom: -5px;
            background-color: $second-yellow;
            height: 2px;
            transition: all 0.2s;
            opacity: 0;
          }
        }
        @media (max-width: 400px) {
          padding: 5px 2px 8px;
        }

        &.active {
          @media (max-width: $xs) {
            //border-bottom: 5px solid $second-yellow;
            &:after {
              left: 0%;
              right: 0%;
              opacity: 1;
              //width: 100%;

            }
          }
        }

        &-text {
          text-wrap: nowrap;
          @include h6;
          color: #fff;
          @media (max-width: $xss) {
            @include subtitle-small(500);
          }
          @media (max-width: $xsss) {
            font-size: 16px;
          }
          @media (max-width: 400px) {
            @include text-normal(500);
          }
        }
      }

      .line {
        position: absolute;
        bottom: 0;
        width: 20%;
        left: 0;
        height: 5px;
        transition: left .6s;
        padding: 0 10px;
        @media (max-width: $xs) {
          display: none;
        }

        &-block {
          background-color: $second-yellow;
          height: 100%;

        }
      }
    }
  }
}
</style>