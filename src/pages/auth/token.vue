<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store";
import {useCommonStore} from "~/stores/common.store";

definePageMeta({
  requirementUser : null
})
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const commonStore = useCommonStore()

const isExpiredToken = ref(false)

const getToken = async () => {
  console.log('route.query.code', route.query.code)
  if (route.query.code) {
    commonStore.isLoadingPage = true
    await authStore.getSessionTokenWitchLink(route.query.code as string)
        .then(async res => {
          if(authStore.statusUser === 'active') await router.push('/profile')
        })
        .catch((err) => {
          console.log('err 00', err)
          console.log('err?.statusCod', err?.statusCode)
          if(err?.statusCode == 410 || err?.statusCode == 401) {
            isExpiredToken.value = true
          } else {
            throw err
          }
        }).finally(() => {
          commonStore.isLoadingPage = false
        })
    console.log('authStore.statusUser', authStore.statusUser, authStore.userFullData)
  }
}


await getToken()

</script>

<template>
  <div class="page-token">
    <LayoutWrapperPage>

      <BaseWrapperWithDogs image="hasky_in_lavander">
        <div class="page-token__row">
          <FormWindow type="original" v-if="isExpiredToken" class="page-token__fail">
            <template #title>
              Ошибка подтверждения
            </template>
            <template>
              <span class="page-token__fail-text">
                Ссылка неверна или срок её действия истек. <br>Запросите новую ссылку, заполнив email в форме.
              </span>
            </template>
            <template #action-buttons>
              <BaseButton type="violet" text="Перейти к форме" to="/auth/login" />
            </template>
          </FormWindow>
        </div>
      </BaseWrapperWithDogs>

    </LayoutWrapperPage>
  </div>
</template>

<style scoped lang="scss">
.page-token {
  width: 100%;
  &__row {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__fail {
    @media (max-width: $sm) {
      //position: absolute;
      backdrop-filter: blur(10px);
    }
    &-text {
      @include h6;
      text-align: center;
      color: $violet;
    }
  }
}
</style>