<script setup lang="ts">
import LayoutHeaderNav from '@/components/Layout/LayoutHeaderNav.vue'
import { ref} from 'vue'
import CommonAlertsList from "~/components/Common/CommonAlertsList.vue";
import LayoutHeader from "~/components/Layout/LayoutHeader.vue";

const route = useRoute()

const isShowMenu = ref(false)

const breedsStore = useBreedsStore()
const commonStore = useCommonStore()


const isPersonalMenu = computed(() => route.path.startsWith('/personal') || route.query.type === 'personal')

</script>

<template>
  <div class="default-layout">
    <CommonLoading />
    <LayoutHeader />
    <main class="main">

      <div class="main-container">
        <slot></slot>
        <NuxtLoadingIndicator color="#47456D" :height="5" :throttle="3" />

      </div>
      <CommonUpButton />
      <CommonAlertsList/>
      <PersonalMenu v-if="isPersonalMenu" />
    </main>
  </div>
</template>

<style scoped lang="scss">

.default-layout {
  min-height: 100vh;
  background-color: $back;


  .main {
    //background: rgb(178, 225, 218);
    min-height: 100vh;

    &-container {
      min-height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      max-width: 1920px;
      padding: 30px 0 0;
    }
  }
}

</style>