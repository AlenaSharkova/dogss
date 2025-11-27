<script setup lang="ts">
import type {ISelectComponent, ISelectComponentWithChildren} from "~/struct/Common/ISelectComponent";
import {defineProps, withDefaults} from "vue";

const props = withDefaults(
    defineProps<{
      regionItem?: ISelectComponentWithChildren | null;
      regionsItemStart?: ISelectComponentWithChildren[] | null;
      name: string;
      selected: ISelectComponentWithChildren | null;
      search: string
    }>(), {
      regionItem: null,
      selected: null,
      search: ''
    }
)
const emits = defineEmits(['select'])
const isOpen = ref(false)
const statusRegion = ref<'active' | 'passive' | 'incomplete'>('passive')
const selectedChildren = ref<ISelectComponent[]>([])

const children = ref([])
const startRegion = computed(() => props.regionsItemStart?.find(item => item?.value == props.regionItem?.value))

const toggleChild = () => {
  isOpen.value = !isOpen.value
}
const toggleItem = () => {
  if(!props.regionItem) return
  if(statusRegion.value == 'passive' && props.regionItem?.children) {
    selectedChildren.value = props.regionItem?.children
    statusRegion.value = 'active'

    emits('select', statusRegion.value, startRegion.value  )
  } else {
    selectedChildren.value = []
    statusRegion.value = 'passive'
    emits('select', statusRegion.value, startRegion.value  )
  }
}
const selectChild = (children: ISelectComponent) => {
  console.log('selectedChildren.value', selectedChildren.value, selectedChildren.value.length && selectedChildren.value[0].value && selectedChildren.value[0].text)

  if(selectedChildren.value.length ) {
    if(startRegion?.children?.length !== selectedChildren.value.length) {
      statusRegion.value = 'incomplete'
      emits('select', statusRegion.value, startRegion.value , children )

    } else {
      statusRegion.value = 'active'
      emits('select', statusRegion.value, startRegion.value )
    }
  } else {
    statusRegion.value = 'passive'
    emits('select', statusRegion.value, startRegion.value )


  }
}
watch(() => props.search,
    (newValue) => {
      isOpen.value = !!newValue
      children.value = props.regionItem?.children?.sort((a, b) => !!selectedChildren.value?.find(item => item.value === b.value ) - !!selectedChildren.value?.find(item => item.value === a.value) )

    }
)
watch(() => props.selected,
    (newValue) => {
      console.log('watch', newValue)
      if(!newValue) {
        statusRegion.value = 'passive'
        return
      }
      console.log('mount', newValue)

      if(props.selected.children?.length) {
        statusRegion.value = 'active'
        selectedChildren.value = props.regionItem.children
      } else {
        statusRegion.value = 'incomplete'
        selectedChildren.value = newValue
      }
    }
)

onMounted(() => {
  isOpen.value = !!props.search
  if(props.selected) {
    if(props.selected.children?.length) {
      statusRegion.value = 'active'
      selectedChildren.value = props.selected.children
    } else {
      statusRegion.value = 'incomplete'
      selectedChildren.value = props.selected
    }
  }
  children.value = props.regionItem?.children?.sort((a, b) => !!selectedChildren.value?.find(item => item.value === b.value ) - !!selectedChildren.value?.find(item => item.value === a.value) )
})
</script>

<template>
  <div class="select-enclosure-item">
    <div v-if="regionItem" class="select-enclosure-item__wrapper">
      <div class="select-enclosure-item__block"
           :class="{checked: statusRegion == 'active', open: isOpen, incomplete: statusRegion == 'incomplete'}"
           @click="toggleItem"
      >
        <div class="select-enclosure-item__content">
          <div class="select-enclosure-item__content-status">
            <div v-if="statusRegion == 'incomplete'" class="select-enclosure-item__content-incomplete" :class="{close:  statusRegion == 'incomplete'}"/>

            <BaseIconCheck v-else class="select-enclosure-item__content-check" :class="{close: statusRegion == 'passive'}"/>
          </div>
            <p>{{regionItem?.text}}</p>

        </div>
        <div class="select-enclosure-item__arrow" :class="{flipped: isOpen}" @click.stop="toggleChild" >
          <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 1.125L9.52279 6.60221C8.81985 7.30515 7.68015 7.30515 6.97721 6.60221L1.5 1.125" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>


      <div v-show="isOpen"
           class="select-enclosure-item__cites"
      >
        <div
             class="select-enclosure-item__cites-item"
             v-for="(child, indexChild) in children"
             :key="indexChild"
        >
          <input
              class="select-enclosure-item__cites-item__content-input"
              :name="`input-select-enclosure-${name}`"
              type="checkbox"
              v-model="selectedChildren"
              @change="selectChild(child)"
              :id="`input-select-enclosure-${name}-${indexChild}`"
              :value="child"
          />
          <label :for="`input-select-enclosure-${name}-${indexChild}`" class="select-enclosure-item__cites-item__content">

            <BaseIconCheck class="select-enclosure-item__cites-item__content-check" />
            <div class="select-enclosure-item__cites-item__content-uncheck" />
            <p>{{ child.text }}</p>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-enclosure-item {
  &__block {
    display: flex;
    cursor: pointer;
    gap: 10px;
    background: var(--white, #FFFFFF);
    padding: 12px;
    border-radius: 8px;
    transition: background 0.2s;
    &:hover {
      background: $back;
    }
    &.open {
      //color: $white-text;
      background: $back;


    }
    &.incomplete {
      color: $white-text;
      background: $violet-opacity;
      .select-enclosure-item__arrow {
        svg {
          path {
            stroke: $white-text;
          }
        }
      }

    }
    &.checked {
      color: $white-text;

      background: $violet;
      .select-enclosure-item__arrow {
        svg {
          path {
            stroke: $white-text;
          }
        }
      }

    }
  }
  &__content {
    display: flex;
    gap: 5px;
    border-bottom: none;
    border-radius: 8px;
    width: 100%;
    transition: opacity 0.2s;
    align-items: center;
    &-status {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
    }
    &-check {
      &.close {
        opacity: 0;
      }
    }
    &-incomplete {
      flex-shrink: 1;
      border: 3px solid $second-yellow;
      border-radius: 50%;
      width: 16px;
      height: 16px;
    }

  }
  &__cites {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px 0 5px 40px;
    &-item {
      min-height: 48px;

      &__content {
        min-height: 48px;


        display: flex;
        align-items: center;
        gap: 5px;

        cursor: pointer;

        background: var(--white, #FFFFFF);
        padding: 12px;
        border-radius: 8px;
        transition: background 0.2s;
        &:hover {
          background: $back;

        }
        &-check {
          opacity: 0;
          display: none;
        }
        &-uncheck {
          margin: 0 4px;
          border-bottom: 3px solid $second-yellow;
          width: 16px;
          opacity: 1;
        }
        &-input {
          display: none;
        }
        &-input:checked + .select-enclosure-item__cites-item__content {
          //background: var(--primary, #2D2D2D);
          background: $violet;

          color: var(--white, #FFFFFF);
          .select-enclosure-item__cites-item__content-check {
            opacity: 1;
            display: block;
          }
          .select-enclosure-item__cites-item__content-uncheck {
            opacity: 0;
            display: none;
          }

        }
      }
    }
  }
  &__arrow {
    cursor: pointer;
    width: 24px;
    transition: transform .5s;
    flex-shrink: 0;
    padding: 0 7px;

    &.flipped {
      svg {
        transform: rotate(-0.5turn);
      }
    }
    &.active {
      svg {
        path {
          stroke: #2D2D2D
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
</style>