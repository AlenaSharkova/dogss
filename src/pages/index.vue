<script setup lang="ts">
import LayoutWrapperPage from "~/components/Layout/LayoutWrapperPage.vue";
</script>
<template>
  <div class="home-page">
    <LayoutWrapperPage>
      <div class="home-page__title">
        <span>Добро пожаловать, в собачий мир!</span>
      </div>
    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
.home-page {
  padding: 20px;
  color: $dark-text;
  @include h1;
}

</style>