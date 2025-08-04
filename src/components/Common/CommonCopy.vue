<script setup lang="ts">
 import BaseIconCopy from "~/components/Base/BaseIcon/BaseIconCopy.vue";

 const props = defineProps({
   text: {
     type: String,
     required: true,
   }
 })

 const commonStore = useCommonStore()

const copyToClipboard = () => {
  return navigator.clipboard.writeText(props.text).then(
      () => {
        commonStore.addUserInfoAlert('Текст скопирован')
      }
  ).catch((err) => {
    console.log('текст не скопирован')
  })

}
</script>

<template>
  <div @click.stop="copyToClipboard" class="common-copy">
    <BaseIconCopy class="common-copy__icon"/>
  </div>
</template>

<style scoped lang="scss">
.common-copy {
  width: 35px;
  height: 35px;
  box-shadow: $box-shadow-lite;
  background-color: $violet-opacity-max;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  &__icon {
    width: 22px;
    color: white;
  }
}
</style>