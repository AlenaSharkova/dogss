<script setup lang="ts">
import type {PropType} from "vue";
import type {UserItemPublicStruct} from "~/struct/User/UserItemStruct";

defineProps({
  widthProgress: {
    type: String,
    default: '0%'
  }
})
</script>

<template>
  <div class="base-progressbar">
    <div
        class="base-progressbar-line"
        :style="{width: widthProgress}"
    >
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-progressbar {
  margin-top: 10px;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: $violet;
  background: $violet-opacity;
  //background: #f4f4f4ff;
  background: $white-text;
  box-shadow: $box-shadow-lite;

  //background: #B2E1DA99;
  position: relative;
  overflow: hidden;
  &-line {
    position: absolute;
    left: 0;
    //background: $light-teal;
    //background: $light-teal;
    background: $violet;
    //background: $yellow;
    top: 0;
    bottom: 0;
    z-index: 0;
    border-radius: 2px;
    transition: width 0.7s;
  }
}
</style>