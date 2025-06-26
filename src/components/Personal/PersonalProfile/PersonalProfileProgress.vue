<script setup lang="ts">
import {computed} from "vue";

const widthProgress = computed(() => {
  return (1 * 25) + '%'
})
</script>

<template>
  <div class="personal-profile__progress">
    <div class="personal-profile__progress-row">
      <div class="personal-profile__progress-text">
        <span>Заполненность вашего аккаунта: {{widthProgress}}</span>
      </div>
      <BaseProgressBar :width-progress="widthProgress" />

    </div>

  </div>

</template>

<style scoped lang="scss">
.personal-profile__progress {
  &-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>