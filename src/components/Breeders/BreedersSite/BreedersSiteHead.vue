<script setup lang="ts">

import {defineProps, ref, withDefaults} from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import {useCommonStore} from "~/stores/common.store";
gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(
    defineProps<{
      title: string

    }>(),
    {
    },
);

const tabNavList = reactive([
  {
    name: "О нас",
    id: "about",
    isActive: true,
  },
  {
    name: "Наши питомцы",
    id: "dogs",
    isActive: false,
  },
  {
    name: "Объявления",
    id: "ad",
    isActive: false,
  },
  {
    name: "Комментарии",
    id: "comments",
    isActive: false,
  },
])
const isActiveIndex = ref(0)
const lineWidthTabNum = computed(() => 100 / tabNavList.length )
const lineWidthTab = computed(() => lineWidthTabNum.value +'%' )
const lineLeftTab = computed(() => isActiveIndex.value * lineWidthTabNum.value + '%' )

const changeTab = (idSelect: string) => {
  tabNavList.forEach((item, index) => {
    console.log(item, item.id, idSelect)
    if(item.id === idSelect) {
      item.isActive = true
      isActiveIndex.value = index
    } else {
      item.isActive = false
    }
  })
}
const classAdded = ref(false)
const startValue = ref('+=130px')
const targetElement = useTemplateRef<HTMLElement>('target-element')
const scrollTriggerInstance = ref<globalThis.ScrollTrigger | null>(null);
const animationInstance = ref<gsap.core.Tween | null>(null);

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger); // Убедитесь, что ScrollTrigger зарегистрирован
  console.log('targetElement.value 1', targetElement.value)

  await createTrigger()

});

const createTrigger = async () => {

  if (scrollTriggerInstance.value) {
    scrollTriggerInstance.value.kill(); // Убиваем старый ScrollTrigger
  }


  animationInstance.value = gsap.to('.user-site__head-nav', {
    height: '165px',
    duration: 1,
    scrollTrigger: {
      trigger: ".user-site__head-block",
      start: `bottom +=90px`,

      end: "bottom -=100px",
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
const commonStore = useCommonStore()

watch(() => commonStore.isScrolled,
    () => updateStart()
)


onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
})

const isShowMenu = ref(false)

</script>

<template>
  <div class="user-site__head">
    <div class="user-site__head-block">
      <div class="user-site__head-image">
        <img src="/image/test-dog/abce4a3bc3a9f343180cc20b81fbbeb4.webp"/>
        <div class="user-site__head-image__mask" />
      </div>
      <div class="user-site__head-content">
        <div class="user-site__head-content__title">
          <h1>{{title}}</h1>
        </div>
      </div>
      <div ref="target-element" class="user-site__head-nav"
           :class="{fixed: classAdded}">
        <div class="user-site__head-nav__row">
          <Transition name="fade">
            <div v-if="classAdded" class="user-site__head-nav__personal">
              <BaseProfileCircle
                  name="Николай Шарков"
                  size="medium"
                  unfull
                  img="/image/test-dog/abce4a3bc3a9f343180cc20b81fbbeb4.webp" />
              <div class="user-site__head-nav__personal-content">
                <div class="user-site__head-nav__personal-content__title">
                  <p>{{title}}</p>
                </div>
                <div class="user-site__head-nav__personal-content__action">
                  <BaseButton text="Подпсиаться" size="medium"/>
                </div>
              </div>
            </div>
          </Transition>
          <nav class="user-site__head-nav__list">
            <div class="user-site__head-nav__item"
                 v-for="tab in tabNavList"
                 :key="tab.id"
                 :class="{active: tab.isActive}"
                 @click="changeTab(tab.id)"
            >
              <p class="user-site__head-nav__item-text">
                {{tab.name}}
              </p>
            </div>
            <div class="line" :style="{width: lineWidthTab, left: lineLeftTab}">
              <div class="line-block" />
            </div>

          </nav>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.user-site__head {
  box-sizing: border-box;
  &-block {
    height: calc(100vh - 30px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-image {
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
    &__mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 32%);
    }
  }
  &-content {
    padding: 50px;

    &__title {
      @include h0;
      color: #fff;
    }
  }
  &-nav {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: $violet-opacity;
    backdrop-filter: blur(6px);
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    will-change: header;

    &.fixed {
      z-index: 10;
      position: fixed;
      top: 0px;
      transition: all 0.5s;
      .user-site__head-nav {
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
        gap: 16px;
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
    }
    &__item {
      flex: 1;
      padding: 5px 20px 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;
      p {
        text-wrap: nowrap;
        @include h5;
        color: #fff;
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
      &-block {
        background-color: #E0A96FFF;
        height: 100%;

      }
    }
  }
}
</style>