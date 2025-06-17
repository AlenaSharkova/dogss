<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";

const props = withDefaults(
    defineProps<{
      items: ISelectComponent[];
    }>(), {}
)
const selectedItem = defineModel<ISelectComponent | null>({default: null})
if(selectedItem.value === undefined) selectedItem.value = props.items[0]

const activeIndex = ref(props.items.findIndex(item => item.value === selectedItem.value?.value) )
const selectItem = (index: 0 | 1) => {
  activeIndex.value = index;
  selectedItem.value = props.items[index]
}
</script>

<template>
  <div class="base-tab-switch">
    <div class="base-tab-switch__wrapper">
      <div class="base-tab-switch__active"
           :class="{'--right': activeIndex == 1}"
      >
      </div>
      <div class="base-tab-switch__item --first"
           :class="{'--active': activeIndex == 0}"
           @click="selectItem(0)"
      >
        <span>
          {{items[0].text}}
        </span>
      </div>
      <div class="base-tab-switch__item --second"
           @click="selectItem(1)"
           :class="{'--active': activeIndex == 1}"
      >
        <span>
          {{items[1].text}}
        </span>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
.base-tab-switch {
  border-radius: 8px;
  padding: 6px 10px;
  width: max-content;
  background-color: #FFF;
  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    position: relative;
    width: max-content;
  }
  &__item {
    padding: 14px 5px;
    cursor: pointer;
    width: 150px;
    text-align: center;
    color: $dark-text;
    transition: all 0.5s;
    z-index: 1;
    &.--active {
      color: $white-text;
    }
  }
  &__active {
    position: absolute;
    border-radius: 8px;
    width: 150px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $violet;
    transition: all 0.5s;
    &.--right {
      left: calc(50% + 10px);
    }
  }
}
</style>