<script setup lang="ts">
import {useUsersStore} from "~/stores/users.store";
import {computed} from "vue";
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import {useAdStore} from "~/stores/ad.store";
import CardAdItem from "~/components/Card/CardAdItem.vue";
import {Autoplay, EffectCoverflow} from "swiper/modules";
import BreedersSiteHead from "~/components/Breeders/BreedersSite/BreedersSiteHead.vue";
import BaseIconPaws from "~/components/Base/BaseIcon/BaseIconPaws.vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";

definePageMeta({
  requirementUser : null
})
const route = useRoute();
const idUser = ref<string | null>(null)

const usersStore = useUsersStore()

const userViewData = computed(() => usersStore.userViewData )

idUser.value = route.params.id as string

usersStore.getUserViewData(idUser.value)

</script>

<template>
  <div class="page-user">
    <UserPage :user="userViewData" v-if="userViewData"/>
  </div>
</template>

<style scoped lang="scss">
.page-user {
  width: 100%;
}
</style>
<style lang="scss">

.page-breeder__gallery-swiper {
  .swiper-wrapper {
    align-items: center;
  }
}
</style>