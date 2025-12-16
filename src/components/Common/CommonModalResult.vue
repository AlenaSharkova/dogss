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
      <template #default>
        <div class="common-modal__result-main">
          <div class="common-modal__result-main__wrapper">
            <div class="common-modal__result-main__icon">
              <BaseIconResult :name="infoModal?.status" />
            </div>
            <div class="base-window-result__header">
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
    align-items: center;
    justify-content: center;
  }
}
</style>