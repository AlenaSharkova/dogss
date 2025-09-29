<script setup lang="ts">
import { defineProps, withDefaults, ref, computed } from "vue";
import type { ISelectComponent } from "~/struct/Common/ISelectComponent";
import useScreen from "~/utils/useScreen";

const props = withDefaults(
    defineProps<{
      items: ISelectComponent[];
      name: String
    }>(),
    {}
);
const { isMobileXs, isMobile } = useScreen();

const selectedItem = defineModel<ISelectComponent | null>({ default: null });

// Устанавливаем selectedItem при инициализации, если он не определен
if ((!selectedItem.value || !selectedItem.value.hasOwnProperty('value')) && props.items.length > 0) {
  selectedItem.value = {...props.items[0]};
} else if(selectedItem.value?.hasOwnProperty('value') && !selectedItem.value.hasOwnProperty('text')) {
  selectedItem.value = props.items.find((item) => item.value ===  selectedItem.value?.value) as ISelectComponent;
}

// Вычисляем индекс активного элемента на основе selectedItem
const activeIndex = computed(() => {
  return props.items.findIndex((item) => item.value === selectedItem.value?.value);
});


watch(() => selectedItem.value?.value,
    (newValue) => {
      selectedItem.value = props.items.find((item) => item.value === newValue) as ISelectComponent;
    }
)
const countViewTabsLine = computed(() => {
  if(isMobileXs.value) return 2
  if(isMobile.value) return props.items?.length > 3? 3: props.items?.length || 1
  return props.items?.length || 1
})
</script>

<template>
  <div class="base-tab-switch">
    <div class="base-tab-switch__wrapper">
      <div
          class="base-tab-switch__active"
          :style="{
            width:  `${100 / countViewTabsLine}%`,
            left: `${activeIndex % countViewTabsLine * 100/countViewTabsLine}%`,
            top: `${  47 * Math.floor(activeIndex/countViewTabsLine) }px`,
            height: '47px'
          }"
      ></div>
      <div
          class="base-tab-switch__item"
          v-for="(item, index) in items"
          :key="item.value">
        <input
            v-model="selectedItem"
            type="radio"
            :value="item"
            :name="`input-tab-switch-${name}`"
            :id="`input-tab-switch-${name}-${item.value}`"
        />
        <label
            :for="`input-tab-switch-${name}-${item.value}`"
            :class="{ '--active': activeIndex === index }"
        >
          <span></span>
          <span>{{ item.text }}</span>
          <div v-if="item.details?.count || item.details.count == 0"
               class="base-tab-switch__item-count">
            <span>{{item.details.count}}</span>
          </div>
        </label>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.base-tab-switch {
  width: 100%;
  border-radius: 8px;
  padding: 6px 10px;
  background-color: #fff;
  box-shadow: $box-shadow-lite;
  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    @media (max-width: $sm) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: $xs) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  &__item {
    width: 100%;
    height: 47px;
    cursor: pointer;
    color: $dark-text;
    transition: all 0.5s;
    z-index: 1;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      transition: all 0.5s;
    }
    &.--active {
      span {
        color: $white-text;
      }
    }
    input {
      display: none;
    }
    label {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 5px;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 14px 5px;
      cursor: pointer;
    }
    input:checked + label {
      color: $white-text;
      .base-tab-switch__item-count {
        background-color: $light-teal;
      }
    }
    &-count {
      position: relative;
      background-color: $light-teal-99;
      backdrop-filter: blur(10px);
      padding: 5px;
      min-width: 30px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -10px;
      width: min-content;
      transition: all 0.5s;
      span {
        color: $violet;
        @include text-small(500);
      }
    }
  }

  &__active {
    position: absolute;
    border-radius: 8px;
    height: 100%;
    top: 0;
    background-color: $violet;
    transition: all 0.5s;
    box-sizing: border-box;
  }
}
</style>
