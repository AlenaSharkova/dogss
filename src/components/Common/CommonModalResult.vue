<script setup lang="ts">

const emit = defineEmits(["close"]);

const commonStore = useCommonStore()

const infoModal = computed(() => commonStore.infoResultModal)

const close = () => {
  commonStore.closeResultModal()
}
const actionBtn = (actionCustom: () => void) => {
  actionCustom()
  commonStore.closeResultModal()
}
</script>

<template>
  <BaseModal class="common-modal__result" :is-show-modal="!!infoModal" @close="close">
    <FormWindow modal @close="$emit('close')">
      <template #title>
        <span class="common-modal__result-title" :class="infoModal?.status"> {{infoModal?.title}} </span>
      </template>
      <template #default>
        <div class="common-modal__result-main">
          <div class="common-modal__result-main__wrapper">
            <div class="common-modal__result-main__icon">
              <BaseIconResult :name="infoModal?.status" class="modal-result-icon" />
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
      <template v-if="infoModal?.actionsBtn" #action-buttons>
        <BaseButton
            v-for="btn in infoModal.actionsBtn"
            :text="btn.text"
            :type="btn.typeStyle"
            @click="actionBtn(btn.action)"
        />

      </template>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.common-modal__result {
  &-title {
    &.success {
      color: #81C784;
    }
    &.error {
      color: #E57373;
    }
    &.attention {
      color: #47456D;
    }
  }
  &-main {
    display: flex;
    gap: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__icon {
      height: 300px;
      .modal-result-icon {
        height: 100%;
      }
    }
  }
}
</style>