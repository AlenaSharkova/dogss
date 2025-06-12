<script setup lang="ts">
import {useCommonStore} from "~/stores/common.store";
import type {IUsersAlert} from "~/struct/Common/IUsersAlert";

const commonStore = useCommonStore()

const showingUserAlert = computed<IUsersAlert[]>(() =>
    commonStore.userAlerts.filter(item => item.isShow && item.message)
)

const closeItem = (item: IUsersAlert) => {
  item.isShow = false
}
</script>

<template>
  <div class="common-alerts-list">
    <TransitionGroup name="skip">
      <CommonAlertsItem
          v-for="(item, index) in showingUserAlert"
          :key="index"
          :style="{bottom: (showingUserAlert.length - 1 - index) * 20 + 'px', zIndex:  index }"
          :message="item.message"
          :status="item.status"
          :onlyDev="item.onlyDev"
          @close="closeItem(item)"
          class="common-alerts-list__window">
      </CommonAlertsItem>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
$modal-offset: 20px;
.common-alerts-list {
  @include subtitle-small;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  z-index: 20;
}
.skip-leave-active, .skip-enter-active {
  transition: all 0.4s;
}
.skip-enter-from, .skip-leave-to {
  opacity: 0;
  right: -100px!important;
  //top: 40px!important;
}
.skip-enter-to, .skip-leave-from  {
  //top: 50px;
  right: 0!important;
  opacity: 1;
}
</style>