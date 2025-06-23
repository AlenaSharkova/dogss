<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";
import CommonModalFile from "~/components/Common/CommonModalFile.vue";
import {usePersonalStore} from "~/stores/personal.store";
import {computed} from "vue";
import PersonalAd from "~/components/Personal/PersonalAd.vue";
import PersonalFavorites from "~/components/Personal/PersonalFavorites.vue";
import UserPageHeader from "~/components/User/UserPage/UserPageHeader.vue";

definePageMeta({
  requirementUser : 'authorized'
})

const authStore = useAuthStore()
const personalStore = usePersonalStore()

const userFullData = computed(() => authStore.userFullData)


onMounted( () => {
  //мб не надо
  if (authStore.statusUser === 'unknown') {
   // authStore.getUserFullData()
  }
})
</script>

<template>
  <PersonalMenu />
  <div v-if="userFullData" class="page-personal">
    <UserPageHeader />
    userFullData: {{authStore.userFullData}}
    <BaseButton text="Мои объявления" to="/personal/ads" />
    <a href="https://wa.me/79538143425?text=Здравствуйте!%20Пишу%20насчёт%20Вашего%20объявления%20с%20сайта%20dogsik!" target="_blank" rel="noreferrer">Напишите мне в WhatsApp!</a>
  </div>
</template>

<style scoped lang="scss">
.page-personal {
  width: 100%;
  &__header {

  }
}
</style>