<script setup lang="ts">
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";

defineProps({
  text: {
    type: String,
    default: ''
  }
})

const isExportPopup = ref(false)


const onFocusExport = () => {
  isExportPopup.value = true
}
const onBlurExport = () => {
  isExportPopup.value = false
}
</script>

<template>
  <div @mouseenter="onFocusExport"
       @mouseleave="onBlurExport"
       class="base-with-mini-popup">
    <slot></slot>
    <Transition name="fade">
      <div v-if="isExportPopup" class="base-with-mini-popup__main">
        <div class="base-with-mini-popup__wrapper">
          <p v-html="text" class="base-with-mini-popup__text"></p>
        </div>
      </div>
    </Transition>
  </div>

</template>

<style scoped lang="scss">
.base-with-mini-popup {
  &__main {
    position: absolute;
    top: -84px;
    right: 2px;
    width: 200px;
    height: auto;
    max-height: 800px;
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: $box-shadow-second;
    background-color: $back;
  }
  &__wrapper {
    padding: 7px 10px;
  }
}
</style>