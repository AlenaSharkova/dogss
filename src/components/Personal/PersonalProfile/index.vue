<script setup lang="ts">

import BaseProfileCircle from "~/components/Base/BaseProfileCircle.vue";
import PersonalOffers from "~/components/Personal/PersonalOffers.vue";
import {computed} from "vue";
import PersonalProfilePhoto from "~/components/Personal/PersonalProfile/PersonalProfilePhoto.vue";

const authStore = useAuthStore()

const isShowChangeInfo = ref(false)

const userFullData = computed(() => authStore.userFullData)
const userFullName = computed(() => `${userFullData.value?.personal_data.last_name} ${userFullData.value?.personal_data.first_name}` )

const showChangeInfo = () => {
  isShowChangeInfo.value = true
}
</script>

<template>
  <div class="personal-profile">
    <div class="personal-profile__wrapper">
      <div class="personal-profile__header">
        <PersonalProfilePhoto
            v-if="userFullData"
            :user="userFullData"/>
      </div>
      <PersonalOffers class="personal-profile__offers" />
      <PersonalProfileProgress class="personal-profile__progress" />
      <PersonalProfileInfo
          v-if="userFullData"
          :user="userFullData"
          @change="showChangeInfo()"
          class="personal-profile__progress" />
      <PersonalProfileForm
          v-if="userFullData && isShowChangeInfo"
          :user="userFullData"
          class="personal-profile__progress" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-profile {
  margin-top: 30px;
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>