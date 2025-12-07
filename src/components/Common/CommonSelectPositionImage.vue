<script lang="ts" setup>

const positionsList = ref([
  'left top', 'center top', 'right top',
  'left center', 'center center', 'right center',
  'left bottom', 'center bottom', 'right bottom',
])
const selectedActive = defineModel({default: 'center center'})
const selectActive = (item: string) => {
  selectedActive.value = item
}
</script>

<template>
  <div class="common-select-position-image">
    <div class="common-select-position-image__wrapper">
      <div
          v-for="(item, index) in positionsList"
          :key="index"
          :class="{'--active': item === selectedActive}"
          @click="selectActive(item)"
          class="common-select-position-image__item"
      >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.common-select-position-image {
  &__wrapper {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
  &__item {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid $violet;
    cursor: pointer;
    background: #47456D00;
    transition: all .2s;
    &.--active {
      background: $violet;
    }
  }

}
</style>