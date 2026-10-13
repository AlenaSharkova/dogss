<script setup lang="ts">
import BaseIconStar from "~/components/Base/BaseIcon/BaseIconStar.vue";

const hoverStar = ref(0)
const activeStar = defineModel({default: 0})

const mouseoverStar = (item: number) => {
  hoverStar.value = item
}
const mouseoutStarsList = () => {
  hoverStar.value = 0
}
const clickStar = (item: number) => {
  activeStar.value = item
}
</script>

<template>
  <div class="ad-stars-select"
       @mouseout="mouseoutStarsList()">
    <div v-for="item in 5"
         class="ad-stars-select__item"
         @mouseover="mouseoverStar(item)"
         @click="clickStar(item)"
         :class="{'--hover': item <= hoverStar}"
    >
      <BaseIconStar
          class="star-icon"
          :active="item <= activeStar"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ad-stars-select {
  display: flex;
  &__item {
    width: 65px;
    cursor: pointer;
    &.--hover {
      .star-icon {
        color: $yellow;
      }
    }
  }
}
</style>