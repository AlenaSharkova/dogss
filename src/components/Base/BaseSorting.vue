<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import type {ISelectComponent, ISelectComponentWithChildren} from "~/struct/Common/ISelectComponent";

const props = withDefaults(
    defineProps<{
      list: ISelectComponent[] | null;
    }>(), {

    }
)
const selectedValue = defineModel<string | number | null>({default: null})
const open = ref(false)

const selectedText = computed(() => props.list?.find(item => selectedValue.value == item.value)?.text || '')

const openDropdown = () => {
  open.value = true
}
const closeDropdown = () => {
  open.value = false
}
const selectPoint = (item: ISelectComponent) => {
  selectedValue.value = item.value || ''
  closeDropdown()
}
</script>

<template>
  <div class="base-sorting">
    <div class="base-sorting__wrapper">
      <div @click="openDropdown" class="base-sorting__selected">
        <span v-if="selectedValue && selectedText">
          {{selectedText}}
        </span>
      </div>
      <Transition name="slide-dropdown">
        <div v-if="open" class="base-sorting__dropdown">
          <div class="base-sorting__dropdown-wrapper">
            <div class="base-sorting__dropdown-list">
              <div
                  v-for="(item, index) in list"
                  :key="index"
                  @click="selectPoint(item)"
                  class="base-sorting__dropdown-list__point">
                <span> {{item.text}} </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-sorting {
  &__wrapper {

  }
  &__selected {

  }
  &__dropdown {

    display: grid;
    grid-template-rows: 1fr;
    min-width: 280px;
    position: absolute;
    z-index: 10;
    width: 100%;
    background: $white-background;
    border: 1px solid $violet-opacity-max;
    box-shadow: $box-shadow-lite;
    padding: 4px;
    //border-radius: 8px;
    flex-direction: column;
    border-radius: 8px;

    @media (max-width: $lg) {
      //padding: 8px;
    }
    @media (max-width: $sm) {
      border-radius: 8px 8px 0 0;

      padding: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 14;
      min-height: 10vh;
      height: auto;
      max-height: 70vh;
      display: flex;
      margin-top: auto;
      overflow: hidden;

    }

    &-wrapper {
      height: fit-content;
      overflow: hidden;
      display: flex;
      flex-grow: 1;
      flex-direction: column;

      @media (max-width: $sm) {

      }
    }

    &-list {
      max-height: 266px;
      padding: 7px;
      padding-right: 10px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 4px;
      overflow-y: auto;
      @media (max-width: $sm) {
        max-height: none;
        height: 100%;
        overflow-y: auto;
        //max-height: none;
        //max-height: 20;

        padding: 7px;
      }

      &::-webkit-scrollbar {
        width: 6px;
        @media (max-width: $sm) {
          max-height: max-content;
        }
      }

      &::-webkit-scrollbar-track {
        width: 20px;
      }

      &::-webkit-scrollbar-thumb {
        background: $violet-opacity;
        border-radius: 4px;
      }

      &__point {
        display: flex;
        align-items: center;
        //flex-direction: row-reverse;
        justify-content: space-between;
        cursor: pointer;
        padding: 12px;
        border-radius: 8px;
        width: 100%;
        background: $white-text;
        color: $dark-text;
        transition: all 0.2s;
        &:hover {
          background: $back;
        }
        @media (max-width: $sm) {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &:hover {
            background: transparent;
          }
        }

      }
    }
  }
}

.slide-dropdown-leave-active,
.slide-dropdown-enter-active {
  transition: all .2s ease;
  overflow: hidden;
}
.slide-dropdown-enter-from,
.slide-dropdown-leave-to {
  opacity: 0;
  grid-template-rows: 0fr;
}
</style>