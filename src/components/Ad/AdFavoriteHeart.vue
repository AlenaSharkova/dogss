<script setup lang="ts">

import BaseIconHeart from "~/components/Base/BaseIcon/BaseIconHeart.vue";
import type {PropType} from "vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";


const props = defineProps({
  isFavorite: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    required: true,
  },
  size: {
    type: String as PropType<'smile' | 'middle'>,
    default: 'smile'
  }
})

const personalStore = usePersonalStore()


const isFavorite = ref(props.isFavorite || false)
const isFocusHeart = ref(false)
const isLoadFavorite = ref(false)

const onBlurHeart = () => {
  isFocusHeart.value = false
}
const onFocusHeart = () => {
  isFocusHeart.value = true
}
const actionFavorites = async () => {
  console.log('actionFavorites', props.id)
  if(!isFavorite.value) await addToFavorites()
  else await removeFromFavorites()
}
const removeFromFavorites = async () => {
  isLoadFavorite.value = true
  await personalStore.deletePersonalFavorite(props.id).then(() => {
    isFavorite.value = !isFavorite.value
  }).catch((err) => {
    return err
  }).finally(() => {
    isLoadFavorite.value = false
  })
}
const addToFavorites = async () => {
  isLoadFavorite.value = true
  await personalStore.addPersonalFavorite(props.id).then(() => {
    isFavorite.value = !isFavorite.value
  }).catch((err) => {
    return err
  }).finally(() => {
    isLoadFavorite.value = false
  })
}
watch(() => props.isFavorite,
    (newValue) => {
      isFavorite.value = newValue
    })

</script>

<template>
  <div class="ad-favorite-heart"
       :class="{'--hidden': isLoadFavorite}"
       @click.stop="actionFavorites"
       @mouseenter="onFocusHeart"
       @mouseleave="onBlurHeart"
  >
    <div class="ad-favorite-heart__content">
      <BaseIconHeart
          class="ad-favorite-heart__content-icon"
          :class="`--size-${size}`"
          :active="isFavorite"
          :hover="isFocusHeart"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ad-favorite-heart {
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &-icon {
      width: 20px;
      height: 20px;
      &.--size-middle {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>