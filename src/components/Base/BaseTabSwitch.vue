<script setup lang="ts">
import { defineProps, withDefaults, ref, computed } from "vue";
import type { ISelectComponent } from "~/struct/Common/ISelectComponent";

const props = withDefaults(
    defineProps<{
      items: ISelectComponent[];
    }>(),
    {}
);

const selectedItem = defineModel<ISelectComponent | null>({ default: null });

// Устанавливаем selectedItem при инициализации, если он не определен
if (selectedItem.value === undefined && props.items.length > 0) {
  selectedItem.value = props.items[0];
}

// Вычисляем индекс активного элемента на основе selectedItem
const activeIndex = computed(() => {
  return props.items.findIndex((item) => item.value === selectedItem.value?.value);
});


const selectItem = (index: number) => {
  if (index >= 0 && index < props.items.length) {
    selectedItem.value = props.items[index];
  }
};
</script>

<template>
  <div class="base-tab-switch">
    <div class="base-tab-switch__wrapper">
      <div
          class="base-tab-switch__active"
          :style="{
            width:  `${100 / props.items.length}%`,
            left: `${activeIndex * (100 / props.items.length)}%`,
          }"
      ></div>
      <div
          v-for="(item, index) in items"
          :key="item.value"
          class="base-tab-switch__item"
          :class="{ '--active': activeIndex === index }"
          @click="selectItem(index)"
          :style="{
             width: `${100 / props.items.length}%`,
          }"
      >
        <span>{{ item.text }}</span>
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
  }

  &__item {
    cursor: pointer;
    color: $dark-text;
    transition: all 0.5s;
    z-index: 1;
    box-sizing: border-box;
    padding: 14px 5px;
    text-align: center;

    &.--active {
      color: $white-text;
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
