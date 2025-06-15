<template>
  <div id="app">
    <NuxtLayout name="default">
      <NuxtPage :key="route.path" />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">

const route = useRoute()

console.log('app 2');
</script>