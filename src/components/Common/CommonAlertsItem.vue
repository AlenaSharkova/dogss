<script setup lang="ts">
import {useCommonStore} from "~/stores/common.store";
import type {PropType} from "vue";
import type {ITypeAlert} from "~/struct/Common/IValueType";

const commonStore = useCommonStore()

defineProps({
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String as PropType<ITypeAlert>,
    default: ''
  },
  onlyDev: {
    type: Boolean,
    default: ''
  }
})

const emits = defineEmits(['close'])

onMounted(() => {
  const t = setTimeout(() => {
    emits('close')
    clearTimeout(t)
  }, 8000)
})
</script>

<template>
  <div class="common-alerts-item" :class="[status]">
    <div @click="$emit('close')" class="common-alerts-item__close">
      <BaseIconClose color="white"/>
    </div>
    <div class="common-alerts-item__wrapper">
      <div class="common-alerts-item__text">
        <span v-if="onlyDev" class="common-alerts-item__text-dev">DEV: </span>
        <span>{{message}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$modal-offset: 20px;
.common-alerts-item {
  @include subtitle-small;
  width: 350px;
  min-height: 100px;
  color: white;
  border-radius: 8px;
  position: absolute;
  box-shadow: $box-shadow-middle;
  bottom: 0;
  right: 0;

  &.error {
    background-color: $error;
    border: 1px solid $error-border;
  }
  &.success {
    background-color: $success;
    border: 1px solid $success-border;
  }
  &.info {
    background-color: $info;
    border: 1px solid $info-border;
  }
  &__close {
    position: absolute;
    top: 15px;
    right: 10px;
    cursor: pointer;
  }
  &__wrapper {
    padding: 15px 20px 15px;
  }
  &__text {
    &-dev {
      font-weight: 500;
    }
  }
}

</style>