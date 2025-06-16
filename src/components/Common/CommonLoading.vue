<script setup lang="ts">
import {useCommonStore} from "~/stores/common.store";

const commonStore = useCommonStore()

const isLoadingPage = computed(() => commonStore.isLoadingPage)

</script>

<template>
  <Transition name="fade">
    <div v-if="false" class="common-loading">
      <div class="common-loading__circle">

      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.common-loading {
  position: fixed;
  top: 0; left: 0; bottom: 0; right: 0;
  background-color: #B2E1DA88;

  backdrop-filter: blur(10px);
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
  &__circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #f4f4f488;
    border-top: 5px solid $violet;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>