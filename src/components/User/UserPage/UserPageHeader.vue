<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type {UserPageSectionType} from "~/struct/User/UserPageStruct";

const props = defineProps({
  user: {
    type: Object as PropType<UserItemPublicStruct>,
    default: null
  },
})
const emits = defineEmits(['scroll-to-block'])
const idActiveSection = defineModel<UserPageSectionType | null>({default: null})

const router = useRouter();
const route = useRoute();

const classAdded = ref(false)
const isActiveIndex = computed(() => tabNavList.findIndex(tab => tab.id === idActiveSection.value))

const tabNavList = reactive<{name: string, id: UserPageSectionType}[]>([
  {
    name: "О нас",
    id: "about",
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
const userFullName = computed(() => `${props.user.personal_data.first_name} ${props.user.personal_data.last_name}`)

const lineWidthTabNum = computed(() => 100 / tabNavList.length )
const lineWidthTab = computed(() => lineWidthTabNum.value +'%' )
const lineLeftTab = computed(() => isActiveIndex.value * lineWidthTabNum.value + '%' )

const targetElement = useTemplateRef<HTMLElement>('target-element')
const scrollTriggerInstance = ref<globalThis.ScrollTrigger | null>(null);
const animationInstance = ref<gsap.core.Tween | null>(null);


const changeTab = (idSelect: UserPageSectionType) => {
  //idActiveSection.value = idSelect
  emits('scroll-to-block', idSelect)
}
const createTrigger = async () => {
  if (scrollTriggerInstance.value) {
    scrollTriggerInstance.value.kill(); // Убиваем старый ScrollTrigger
  }
  animationInstance.value = gsap.to('.personal-header__bottom-nav', {
    //поменяла см. breeder
    height: '125px',
    duration: 1,
    scrollTrigger: {
      trigger: ".personal-header",
      //поменяла см. breeder
      start: `bottom +=90px`,
      end: "bottom +=90px",
      scrub: true,
      onEnter: () => {
        classAdded.value = true
      },
      onLeaveBack: () => {
        classAdded.value = false
      },
    }
  });
}


onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger); // Убедитесь, что ScrollTrigger зарегистрирован
  await createTrigger()

});


</script>

<template>
  <div class="personal-header">
    <div class="personal-header__wrapper">
      <BaseProfileCircle :img="user.personal_data.photo" :name="userFullName" size="big" />
      <div class="personal-header__content">
        <h2 class="personal-header__content-name">
          {{ userFullName}}
        </h2>
      </div>
      <div class="personal-header__bottom">
        <div ref="target-element" class="personal-header__bottom-nav"
             :class="{fixed: classAdded}">
          <div class="personal-header__bottom-nav__row">
            <Transition name="fade">
              <div v-if="classAdded" class="personal-header__bottom-nav__personal">
                <BaseProfileCircle
                    :name="userFullName"
                    size="small"
                    unfull
                    :img="user.personal_data.photo" />
                <div class="personal-header__bottom-nav__personal-content">
                  <div class="personal-header__bottom-nav__personal-content__title">
                    <p>{{userFullName}}</p>
                  </div>
                  <!--<div class="personal-header__bottom-nav__personal-content__action">
                    <BaseButton text="Подпсиаться" size="medium"/>
                  </div>
                  -->
                </div>
              </div>
            </Transition>
            <nav class="personal-header__bottom-nav__list">
              <div class="personal-header__bottom-nav__item"
                   v-for="tab in tabNavList"
                   :key="tab.id"
                   :class="{active: tab.id === idActiveSection}"
                   @click="changeTab(tab.id)"
              >
                <p class="personal-header__bottom-nav__item-text">
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
.personal-header {
  background-color: $violet-opacity;

  height: 500px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  /*
    width: 100%;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;*/
  &__wrapper {
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  &__content{
    &-name {
      @include h2();
      color: $white-text;
    }
  }
  &__bottom {
    width: 100%;
    margin-top: auto;
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
        .personal-header__bottom-nav {
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
            @include h5;
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
        /* grid-template-rows: 100px; */
        grid-row: 1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        /* flex-direction: row; */
        /* justify-content: space-between; */
        /* align-items: center; */
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