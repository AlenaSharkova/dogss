<script setup lang="ts">
import { defineProps, withDefaults, ref, computed } from "vue";
import type { ISelectComponent } from "~/struct/Common/ISelectComponent";

const props = withDefaults(
    defineProps<{
      items: ISelectComponent[];
      name: String
    }>(),
    {}
);

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
          <span>{{ item.text }}</span>
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
  }

  &__item {
    width: 100%;
    height: 100%;
    cursor: pointer;
    color: $dark-text;
    transition: all 0.5s;
    z-index: 1;
    box-sizing: border-box;
    text-align: center;

    &.--active {
      span {
        color: $white-text;
      }
    }

    input {
      display: none;
    }
    label {
      display: block;
      width: 100%;
      height: 100%;
      padding: 14px 5px;
      cursor: pointer;
    }
    input:checked + label {
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
