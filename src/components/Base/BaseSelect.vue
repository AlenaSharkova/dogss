<template>
  <div class="base-select" :class="{size, disable}">
    <div v-if="props.showSearch"
         @click="open = open"
         class="base-select__search" >
      <input
          class="base-select__search-input"
          type="text"
          v-model="search"
          :class="[props.rounded, props.class]"
          :disabled="!props.showSearch"
          :placeholder="valueSelectSearch"
          @blur="closeDropdown"
          @focus="openDropdown"
      />
      <label class="label-title" :for="`base-select-${name}`" :class="{'--top': valueSelectSearch}">
        {{ placeholder }}
      </label>
      <div @click.stop="toggleDropdown" class="base-select__search-arrow" :class="{flipped: open, active: singleItemDisplay || multipleItemsDisplay}">
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 1.125L9.52279 6.60221C8.81985 7.30515 7.68015 7.30515 6.97721 6.60221L1.5 1.125" stroke="#958F9C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div v-else class="base-select__main" >
      <button
        class="base-select__main-button"
        @blur="closeDropdown"
        @click="open = !open"
        :class="[props.rounded, props.class, {active: open}]"
      >
        <div class="base-select__main-button__text">
          <Transition name="fade">
            <span v-if="props.modelValue && !props.multiple && singleItemDisplay">
              {{ singleItemDisplay }}
            </span>
            <span v-else-if="props.modelValue && props.multiple && multipleItemsDisplay">
              {{ multipleItemsDisplay }}
            </span>

          </Transition>
        </div>

        <div class="base-select__main-button__placeholder" :class="{'--top': props.modelValue && (multipleItemsDisplay || singleItemDisplay)}" >
          <span>{{ props.placeholder }}</span>
        </div>
        <div class="base-select__main-button__arrow" :class="{flipped: open, active: singleItemDisplay || multipleItemsDisplay}">
          <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 1.125L9.52279 6.60221C8.81985 7.30515 7.68015 7.30515 6.97721 6.60221L1.5 1.125" stroke="#958F9C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
    </div>

    <Transition name="fade">
      <div v-if="open"
           class="base-select__mask"
           @click="closeMobile"
      >
      </div>
    </Transition>
    <Transition name="slide-dropdown">
      <div v-if="open"
           class="base-select__dropdown"
      >

        <div class="base-select__dropdown-wrapper">
          <div v-if="props.showSearch"
               @click="open = true"
               class="base-select__search --mobile" >
            <input
                class="base-select__search-input"
                type="text"
                v-model="search"
                @blur="closeDropdown"
                :placeholder="valueSelectSearch"
                :class="[props.rounded, props.class]"
                :disabled="!props.showSearch"
                :style="{ width: '100%' }"
            />
          </div>
          <div v-if="filteredOptions.length"
               class="base-select__dropdown-list"
          >
            <div
              v-for="(option, i) in filteredOptions"
              :key="i"
              @click.stop="selectOption(option)"
              class="base-select__dropdown-list__point"
            >
             <!-- <input
                class="base-select__dropdown-list__point-input"
                v-if="props.multiple"
                type="checkbox"
                :checked="isSelected(option)"
              />-->
              <input
                v-if="multiple"
                class="base-select__dropdown-list__point-input"
                :name="`input-check-${name}`"
                type="checkbox"
                v-model="selectedOptions"
                @change="toggleSelection(option)"
                :id="`input-check-${name}-${i}`"
                :value="option"
              />

              <input
                v-else
                v-show="isMobile"
                class="base-select__dropdown-list__point-input"
                :name="`input-check-${name}`"
                type="radio"
                v-model="selectedOptions"
                @change="toggleSelection(option)"
                :id="`input-check-${name}-${i}`"
                :value="option"
              />

              <div
                  v-if="isEnclosure"
                  class="base-select__dropdown-list__point-enclosure"
              >
                  <RegionsItem
                      :region-item="option"
                      :regions-item-start="itemsFormat"
                      :name="`${name}-${i}`"
                      :search="search"
                      :selected="activeItemEnclosure(option)"
                      @select="selectEnclosure"
                  />
              </div>
              <label v-else class="base-select__dropdown-list__point-text">
                <span>{{ option.text }}</span>
              </label>

            </div>
          </div>
          <div v-else>
            <span>Элементы не найдены</span>
          </div>
          <div v-if="props.multiple"
               class="base-select__dropdown-buttons">
            <BaseButton @click.stop="resetSections()"
                        text="Сбросить"
                        type="secondary"
                        size="small"
            />
            <BaseButton @click.stop="applyChanges()"
                        text="Применить"
                        size="small"
                        :disabled="isDisabledApply"
            />
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
<script setup lang="ts">

import { onMounted, watch, watchEffect, withDefaults, defineProps, defineEmits} from "vue";
import BaseButton from "~/components/Base/BaseButton.vue";
import useScreen from "~/utils/useScreen";
import type {ISelectComponent, ISelectComponentWithChildren} from "~/struct/Common/ISelectComponent";
import RegionsItem from "~/components/Regions/RegionsItem.vue";
//import { structuredClone } from 'structured-clone'

const props = withDefaults(
    defineProps<{
      items: ISelectComponent[] | ISelectComponentWithChildren[] | null;
      fullValue?: boolean;
      modelValue: any;
      placeholder?: string;
      rounded?: string;
      color?: string;
      class?: string;
      showSearch?: boolean;
      rules?: any[];
      showClear?: boolean;
      multiple?: boolean;
      showError?: boolean;
      model?: any;
      size?: 'small' | 'large';
      name: string;
      isEnclosure?: boolean
      disable?: boolean
    }>(),
    {
      fullValue: false,
      placeholder: "Выберите элемент",
      rounded: "rounded",
      color: "bg-gray-100",
      class: "",
      showSearch: false,
      showClear: true,
      multiple: false,
      showError: false,
      size: 'large',
      isEnclosure: false,
      disable: false
    },
);

const { isMobile } = useScreen();

const itemsFormat: ComputedRef<ISelectComponentWithChildren[]> = computed(() => {
  return props.items || []
})

const valueSelectSearch = computed(() => {
  console.log('valueSelectSearch 0', props.multiple, multipleItemsDisplay.value, singleItemDisplay.value)
  if (props.multiple) return multipleItemsDisplay.value
  else return singleItemDisplay.value
})
const emit = defineEmits(["select", "clear", "update:modelValue", "input", 'onError', 'click-changes', 'open']);
const error = ref("");

let open = ref(false);
let search = ref("");
let selectedOptions = ref<ISelectComponentWithChildren[] >(props.modelValue);
const singleItemValue = ref();
let filteredOptions = ref(JSON.parse(JSON.stringify(itemsFormat.value)))
const multipleItemsDisplay = ref(selectedOptions.value?.length && props.multiple? selectedOptions.value?.filter(item => item.value).map((option) => option.text).join(", "): '')


watch(
    () => props.modelValue,
    (newVal) => {
      if(newVal) {
        console.log('props.modelValue', newVal, props.name)
        selectedOptions.value = newVal;

        if(props.fullValue) singleItemValue.value = newVal.value
        else singleItemValue.value = newVal
        if(props.multiple) {
          multipleItemsDisplay.value = selectedOptions.value?.length? selectedOptions.value?.filter(item => item.value)?.map((option) => option.text).join(", "): ''
          console.log('props.modelValue 2 ', multipleItemsDisplay.value)

        }
      }
    },
    { immediate: true },
);

watch(() => props.items,
    (newVal) => {
      filteredOptions.value = JSON.parse(JSON.stringify(itemsFormat.value))
      multipleItemsDisplay.value = selectedOptions.value?.length? selectedOptions.value?.filter(item => item.value).map((option) => option.text).join(", "): ''

    }
)

watch(() => search.value, () => {
  let results
  if (search.value && props.showSearch) {
    if(props.isEnclosure) {
      results = JSON.parse(JSON.stringify(itemsFormat.value)).filter((option, index, arr) => {
        const filtredChildItem = option.children.filter(child => child.text.toLowerCase().includes(search.value.toLowerCase()))
        if(filtredChildItem?.length) {
          //resultsChildren.push(filtredChildItem)
          arr[index].children = filtredChildItem
        }
        return option.text.toLowerCase().includes(search.value.toLowerCase()) || filtredChildItem?.length
      });
    } else {
      results =  itemsFormat.value.filter((option) =>
          option.text.toLowerCase().includes(search.value.toLowerCase()),
      );
    }

    filteredOptions.value = results.sort((a, b) => {
      const aStartsWith = a.text.toLowerCase().startsWith(search.value.toLowerCase());
      const bStartsWith = b.text.toLowerCase().startsWith(search.value.toLowerCase());
      let aChildStartsWith, bChildStartsWith
      if(props.isEnclosure) {
        aChildStartsWith = a.children?.find(item => item.text.toLowerCase().startsWith(search.value.toLowerCase()))
        bChildStartsWith = b.children?.find(item => item.text.toLowerCase().startsWith(search.value.toLowerCase()))
      }

      if (aStartsWith && !bStartsWith) {
        return -1; // a начинается с searchTerm, b - нет, a должен быть выше
      } else if (!aStartsWith && bStartsWith) {
        return 1
      } else {

        if(aChildStartsWith && !bChildStartsWith && props.isEnclosure) {
          return -1;
        } else if(!aChildStartsWith && bChildStartsWith){
          return 1;  // b начинается с searchTerm, a - нет, b должен быть выше
        } else return 0
        // Если оба начинаются или оба не начинаются с searchTerm, сохраняем исходный порядок или сортируем лексикографически
      }
    })
  } else {
    if(props.isEnclosure) {
      filteredOptions.value = JSON.parse(JSON.stringify(itemsFormat.value))?.sort((a, b) => (!!selectedOptions.value.find(item => item.children ? item.value === b.value : JSON.stringify(b?.children)?.includes(JSON.stringify(item))) - !!selectedOptions.value.find(item => item.children ? item.value === a.value : JSON.stringify(a?.children)?.includes(JSON.stringify(item)))))
    } else filteredOptions.value = [...itemsFormat.value];
    console.log('ssss', itemsFormat.value)
  }
});

const isOpen = ref(false)
const activeItemEnclosure = (option: ISelectComponentWithChildren) => {
  console.log('selectedOptions.value', selectedOptions.value)
  let selectRegion
  if(Array.isArray(selectedOptions.value)) selectRegion = selectedOptions.value?.find(item => item.value == option.value)
  else selectRegion = {...selectedOptions.value}

  if( selectRegion) {
    return selectRegion
  }
  //console.log('ac', option)

  const selectCity = selectedOptions.value?.filter(item => JSON.stringify(option.children).includes(JSON.stringify(item)))

  //console.log('ac 2', selectCity)

  if(selectCity?.length){
    return selectCity
  }
  return null
}
const toggleCity = () => {
  isOpen.value = !isOpen.value
}
const toggleDropdown = () => {
  open.value = !open.value
  if(!open.value) {
    selectedOptions.value = []
    search.value = ''
  }
}
const openDropdown = () => {
  open.value = true
}
const selectOption = (option: ISelectComponent) => {
  if (props.multiple) {
    toggleSelection(option);
  } else {
    singleItemValue.value = option.value;
    if (props.fullValue) {
      emit("update:modelValue", option);
    } else {
      emit("update:modelValue", option.value);
    }
    open.value = false;
  }
};

function toggleSelection(option: ISelectComponent) {
  if(props.isEnclosure) return
  let index = selectedOptions.value.findIndex((opt) => opt.value === option.value);
  if (index >= 0) {
    selectedOptions.value.splice(index, 1);
  } else {
    selectedOptions.value.push(option);
  }
}

function isSelected(option: ISelectComponent) {
  return selectedOptions.value.some((opt) => opt.value === option.value);
}

function closeDropdown() {
  if (!props.multiple) {
    setTimeout(() => {
      if (!filteredOptions.value.find((option) => option.text === search.value)) {
        search.value = "";
      }
      open.value = false;
    }, 250);
  } else {
    /*setTimeout(() => {
      if (!filteredOptions.value.find((option) => option.text === search.value)) {
        search.value = "";
        open.value = false;
      }
    }, 250);*/
  }
}

function closeMobile() {
  open.value = false;
}

let singleItemDisplay = computed(() => {
  if (props.modelValue.value && props.fullValue) {
    return (
        [...itemsFormat.value].find((item) => {
          return item.value === singleItemValue.value;
        })?.text || ""
    );
  } else if(props.modelValue) {
    console.log('aaaa', singleItemValue.value)
    return (
        [...itemsFormat.value].find((item) => {
          return item.value === singleItemValue.value;
        })?.text || ""
    );
  }
  return '';
});


const applyChanges = () => {
  if (props.modelValue && selectedOptions.value.length > 0) {
    multipleItemsDisplay.value = selectedOptions.value.filter(item => item.value).map((option) => option.text).join(", ");
    if (props.fullValue) {
      emit("update:modelValue", selectedOptions.value);
      emit("click-changes", selectedOptions.value);
    } else {
      emit(
          "update:modelValue",
          selectedOptions.value.filter((opt) => opt.value),
      );
      emit(
          "click-changes",
          selectedOptions.value.filter((opt) => opt.value),
      );
    }
    open.value = false;
    if(props.multiple) {
      search.value = ''
    }
  }
}

const selectEnclosure = (status: 'active' | 'passive' | 'incomplete', region: ISelectComponentWithChildren, child = null as ISelectComponent[] | null ) => {
  console.log(status)
  console.log(1, selectedOptions.value, region)

  if(status == 'active') {
    selectedOptions.value.push(region)
    selectedOptions.value = selectedOptions.value.filter(item => !JSON.stringify(region.children).includes(JSON.stringify(item)))
  } else if(status == 'passive') {
    selectedOptions.value =  selectedOptions.value.filter(item => item.value !== region.value || !region.children )
    selectedOptions.value = selectedOptions.value.filter(item => !JSON.stringify(region.children).includes(JSON.stringify(item)))

    console.log(2, selectedOptions.value)


  } else if(child){
    const wasRegionActive = JSON.stringify(selectedOptions.value).includes(JSON.stringify(region))
    if(wasRegionActive) {
      selectedOptions.value = selectedOptions.value.filter(item => JSON.stringify(item) !== JSON.stringify(region))
      selectedOptions.value = region.children?.filter(item => JSON.stringify(item) !== JSON.stringify(child))
      return
    }
    const isAdded = !JSON.stringify(selectedOptions.value).includes(JSON.stringify(child))

    if(isAdded) {
      selectedOptions.value.push(child)
    } else {
      selectedOptions.value = selectedOptions.value.filter(item => JSON.stringify(item) !== JSON.stringify(child))
    }
    console.log(3, isAdded, child)

  }
  console.log(4, selectedOptions.value)

}

const resetSections = () => {
  selectedOptions.value = [];
  emit("update:modelValue", []);
  emit("click-changes", []);
  multipleItemsDisplay.value = '';
  open.value = false;
}

watch(
    [() => itemsFormat.value, () => props.modelValue], // отслеживание обоих значений
    () => {
      // Создание хэш-таблицы для быстрого поиска
      const itemsMap = Object.fromEntries(JSON.parse(JSON.stringify(itemsFormat.value)).map((item) => [item.value, item]));
      if (Array.isArray(props.modelValue)) {
        selectedOptions.value = props.modelValue
            .map((value) => {
              //value.value !== undefined
              if (typeof value === "object" && value.value) {
                return itemsMap[value.value];
              }
              return itemsMap[value];
            })
            .filter((option): option is ISelectComponent => Boolean(option));
        //props.modelValue?.value!== undefined

      } else if (typeof props.modelValue === "object" && props.modelValue?.value) {
        const option = itemsMap[props.modelValue.value];
        if (option) {
          selectedOptions.value = [option];
        } else {
          selectedOptions.value = [];
        }
      } else {
        const option = itemsMap[props.modelValue];
        console.log('option', option)

        if (option) {
          selectedOptions.value = option
        } else {
          selectedOptions.value = [];
        }
      }
    },
    { immediate: true },
);

Object.defineProperty (props, "model", {
  get: function() {
    return this.modelValue
  },
  set: function(value) {
    emit('update:modelValue', value)
  }
})
const isDisabledApply = computed(() => {
  return !selectedOptions?.value.length || JSON.stringify(selectedOptions.value) == JSON.stringify(props.modelValue)
})

watch(props.model, async () => {
  checkRules(true);
});
watch(
    () => props.showError,
    () => {
      checkRules(props.showError);
    },
);


watch(
    () => open.value,
    (newValue) => {
      if (newValue) {
        emit('open')
        if(Array.isArray(props.modelValue)) {

          selectedOptions.value = props.modelValue.slice()
        } else selectedOptions.value = props.modelValue
        if(props.multiple) {
          console.log('itemsFormat.value', itemsFormat.value, selectedOptions.value)
          if(props.isEnclosure) {
            filteredOptions.value = JSON.parse(JSON.stringify(itemsFormat.value))?.sort((a, b) => (!!selectedOptions.value.find(item => item.children? item.value === b.value : JSON.stringify(b?.children)?.includes(JSON.stringify(item)) ) - !!selectedOptions.value.find(item => item.children? item.value === a.value: JSON.stringify(a?.children)?.includes(JSON.stringify(item))  ) ))

           /* filteredOptions.value.forEach((region, index) => {
              if(region) filteredOptions.value[index].children = region.children?.sort((a, b) => !!selectedOptions.value.find(item => item.value === b.value ) - !!selectedOptions.value.find(item => item.value === a.value) )

            })*/
          } else {
            //filteredOptions.value = JSON.parse(JSON.stringify(itemsFormat.value))?.sort((a, b) => (!!selectedOptions.value.find(item => item.value === b.value ) - !!selectedOptions.value.find(item => item.value === a.value ) ))
            filteredOptions.value = [...itemsFormat.value]?.sort((a, b) => (!!selectedOptions.value.find(item => item.value === b.value ) - !!selectedOptions.value.find(item => item.value === a.value ) ))
          }
        }
        console.log('watch open', selectedOptions.value, props.modelValue)
      }
    },
);

const checkRules = (showError?: boolean) => {
  if (props.rules) {
    error.value = "";
    for (const rule of props.rules) {
      const ruleResult = rule(props.model.text);
      if (ruleResult) {
        error.value = showError ? ruleResult : "";
        emit("onError", false);
        return;
      }
    }
    emit("onError", true);
  }
};

onMounted(() => {
  if(props.multiple) {
    //const list = JSON.parse(JSON.stringify(itemsFormat.value))
    //filteredOptions.value = list.sort((a, b) => (!!selectedOptions.value.find(item => item.value == b.value) - selectedOptions.value.find(item => item.value == a.value) ))
  }
  checkRules(props.showError);
});

defineExpose({
  checkRules,
});
</script>
<style scoped lang="scss">
@use 'sass:map';

.base-select {
  position: relative;
  @include text-normal();
  color: $violet;
  width: 100%;
  &.disable {
    pointer-events: none;
    opacity: 0.6;
  }
  &.small {
    @media (max-width: $lg) {
      font-size: 14px;
      @media (max-width: $sm) {
        max-width: none;
        width: 100%;
      }
      .base-select {
        &__main {
          width: unset;
          //min-width: 164px;
          //max-width: 220px;
          @media (max-width: $sm) {
            min-width: auto;
            width: 100%;
          }
          &-button {
            padding: 8px 12px;
            @media (max-width: $sm) {
              padding: 12px;
            }
          }
        }
        &__dropdown {
          padding: 10px;
          .base-select__dropdown-list {
            max-height: 160px;
            @media (max-width: $sm) {
              max-width: none;
              width: 100%;
              overflow-y: auto;
              //max-height: none;
            }
            &__point {
              label {
                padding: 8px 12px;
              }

            }
          }
        }
      }
    }
  }
  &__search {
    min-width: 150px;
    display: flex;
    align-items: center;
    //cursor: pointer;
    //padding: 14px 12px;
    padding: 21px 12px 7px;
    border: 1px solid $violet-opacity-max;
    border-radius: 8px;
    background: $white-text;
    transition: border .3s;
    gap: 15px;
    &.--mobile {
      display: none;
      @media (max-width: $sm) {
        display: block;
      }
    }
    &:hover {
      border: 1px solid $violet;
    }
    @media (max-width: $sm) {
      min-width: auto;
      width: 100%;
    }
    &-input {
      //cursor: pointer;
      padding: 0;
      display: flex;
      width: 100%;
      font-family: "Montserrat", sans-serif;
      justify-content: space-between;
      align-items: center;
      color: $dark-text;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border: 0;
      @include text-normal();
      &::placeholder {
        color: $dark-text;
        @include text-normal();
      }

      &.active {
        border: 1px solid $violet;
        .base-filter__main-button__placeholder {
          color: $violet;
        }
      }
      &::placeholder {
        //color: transparent;
      }
      &:focus-visible {
        outline: none;
      }
      &:focus ~ .prefix,
      &:not(:placeholder-shown) ~ .prefix {
        display: block;
      }
      &:focus ~ .label-title,
      &:not(:placeholder-shown) ~ .label-title {
        top: 4px;
        font-size: 11px;
        letter-spacing: 0.12px;
        font-weight: 500;
      }
    }
    .label-title {
      left: 12px;
      pointer-events: none;
      color: $grey-violet;
      position: absolute;
      top: 16px;
      z-index: 2;
      @include text-normal();
      transition: all 0.2s;
      &.--top {
        top: 4px;
        font-size: 11px;
        letter-spacing: 0.12px;
        font-weight: 500;
      }
    }
    &-arrow {
      position: absolute;
      right: 12px;
      top: 15px;
      cursor: pointer;
      width: 10px;
      transition: transform .5s;
      flex-shrink: 0;
      &.flipped {
        svg {
          transform: rotate(-0.5turn);
        }
      }
      &.active {
        svg {
          path {
            stroke: $grey-violet;
          }
        }
      }
      svg {
        width: 100%;
        height: auto;
        transition: transform .5s;
        path {
          transition: stroke .5s;
        }
      }
    }
  }
  &__main {
    min-width: 150px;
    display: flex;
    align-items: center;
    cursor: pointer;
    @media (max-width: $sm) {
      min-width: auto;
      width: 100%;
    }
    &-button {
      position: relative;
      cursor: pointer;
      font-family: "Montserrat", sans-serif;
      display: flex;
      width: 100%;
      justify-content: space-between;
      //padding: 14px 12px;
      align-items: center;
      border: 1px solid $violet-opacity-max;
      border-radius: 8px;
      background: white;
      transition: border .3s;
      gap: 15px;
      padding: 21px 12px 7px;
      @include text-normal();
      &:hover {
        border: 1px solid $violet;
      }
      &.active {
        border: 1px solid $violet;
        .base-filter__main-button__placeholder {
          color: $grey-violet;
        }
      }
      &__text {
        color: $dark-text;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 20px;
      }
      &__placeholder {
        left: 12px;
        pointer-events: none;
        color: $grey-violet;
        position: absolute;
        top: 16px;
        z-index: 2;
        @include text-normal();
        transition: all 0.2s;
        @media (max-width: $sm){
          width: 100%;
          font-size: 14px;
          line-height: 143%;
          text-align: left;
        }

        &.--top {
          top: 4px;
          font-size: 11px;
          letter-spacing: 0.12px;
          font-weight: 500;
        }

      }
      &__arrow {
        position: absolute;
        right: 12px;
        top: 15px;
        width: 10px;
        transition: transform .5s;
        flex-shrink: 0;
        &.flipped {
          svg {
            transform: rotate(-0.5turn);
          }
        }
        &.active {
          svg {
            path {
              stroke: $grey-violet;
            }
          }
        }
        svg {
          width: 100%;
          height: auto;
          transition: transform .5s;
          path {
            transition: stroke .5s;
          }
        }
      }
    }
  }
  &__mask {
    display: none;
    @media (max-width: $sm) {
      cursor: pointer;
      display: block;
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background-color: rgba(71, 69, 109, 0.6);
      backdrop-filter: blur(10px);
      z-index: 13;
    }
  }
  &__dropdown  {

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
        &-input {
          display: none;
          border-bottom: none;
          @media (max-width: $sm) {
            //display: block;
          }
        }
        &-input:checked + label {
          //background: var(--primary, #2D2D2D);
          background: $violet;
          color: $white-text;

        }
        &-input {
          cursor: pointer;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border: 1px solid $violet;
          appearance: none;
          border-radius: 50%;
          transition: 0.1s all linear;
          position: relative;
          &:checked {
            border: 5px solid $violet;
          }
        }
        &-text {
          display: inline-block;
          border-bottom: none;
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
        &-enclosure {
          width: 100%;
        }
      }
    }
    &-buttons {
      padding: 0 7px 7px;
      display: flex;
      gap: 8px;
      margin-top: 4px;
      @media (max-width: $sm) {
        //padding: 0;
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
