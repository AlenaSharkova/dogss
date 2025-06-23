<script setup lang="ts">

import {useAuthStore} from "~/stores/auth.store";
import {usePersonalStore} from "~/stores/personal.store";
import {computed, ref} from "vue";
import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import gsap from "gsap";

const router = useRouter();
const route = useRoute();
const personalStore = usePersonalStore()
const authStore = useAuthStore()

const classAdded = ref(false)

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
const activeTabId = computed(() => tabNavList.find(item => item.isActive).id )

const isActiveIndex = ref(0)
const lineWidthTabNum = computed(() => 100 / tabNavList.length )
const lineWidthTab = computed(() => lineWidthTabNum.value +'%' )
const lineLeftTab = computed(() => isActiveIndex.value * lineWidthTabNum.value + '%' )


const changeTab = (idSelect: string) => {
  tabNavList.forEach((item, index) => {
    console.log(item, item.id, idSelect)
    if(item.id === idSelect) {
      router.push({query: {type: ''}})
      item.isActive = true
      isActiveIndex.value = index
    } else {
      item.isActive = false
    }
  })
}

const userFullData = computed(() => authStore.userFullData)
const userFullName = computed(() => userFullData.value? `${userFullData.value?.personal_data.first_name} ${userFullData.value?.personal_data.last_name}`: '')


</script>

<template>
  <div v-if="userFullData" class="personal-header">
    <div class="personal-header__wrapper">
      <BaseProfileCircle img="/image/beautiful_dogs/smiles_in_lavender.jpg" :name="userFullName" size="big" />
      <div class="personal-header__content">
        <h2 class="personal-header__content-name">
          {{ userFullName}}
        </h2>
      </div>
      <div class="personal-header__bottom">
        <div ref="target-element" class="personal-header__bottom-nav"
             :class="{fixed: classAdded}">
          <div class="personal-header__bottom-nav__row">
            <nav class="personal-header__bottom-nav__list">
              <div class="personal-header__bottom-nav__item"
                   v-for="tab in tabNavList"
                   :key="tab.id"
                   :class="{active: tab.isActive}"
                   @click="changeTab(tab.id)"
              >
                <p class="personal-header__bottom-nav__item-text">
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
    gap: 20px;
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

}
</style>