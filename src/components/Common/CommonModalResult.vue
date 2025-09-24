<script setup lang="ts">

const emit = defineEmits(["close"]);

const commonStore = useCommonStore()

const infoModal = computed(() => commonStore.infoResultModal)

const close = () => {
  commonStore.closeResultModal()
}
</script>

<template>
  <BaseModal class="common-modal__result" :is-show-modal="!!infoModal" @close="close">
    <FormWindow modal @close="$emit('close')">
      <template #title>
        {{infoModal?.title}}
      </template>
      <template>
        <div class="common-modal__result-main">
          <div class="base-window-result__wrapper">
            <div class="base-window-result__icon">
              <BaseIconResult :name="infoModal?.status" />
              <canvas class="w-full h-full opacity-100 object-contain object-center lower-canvas" aria-label="Версия 1" role="img" width="702" height="727" style="position: absolute; width: 702px; height: 727.75px; left: 0px; top: 0px; touch-action: none; user-select: none;"></canvas><canvas class="upper-canvas w-full h-full opacity-100 object-contain object-center" width="702" height="727" style="position: absolute; width: 702px; height: 727.75px; left: 0px; top: 0px; touch-action: none; user-select: none; cursor: pointer;"></canvas>
            </div>
            <div class="base-window-result__header">
              <div  v-if="infoModal?.title" class="base-window-result__header-title">
                <span>{{infoModal.title}}</span>
              </div>
              <div v-if="infoModal?.subtitle" class="base-window-result__header-subtitle">
                <span v-html="infoModal.subtitle"></span>
              </div>
            </div>
           <!-- <div v-if="$slots['action-buttons']" class="base-window-result__action">
              <slot name="action-buttons" />
            </div>-->
          </div>
        </div>
      </template>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.common-modal__result {
  &-main {
    display: flex;
    gap: 50px;
    flex-direction: column;

  }

}
</style>