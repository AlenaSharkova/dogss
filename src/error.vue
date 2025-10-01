<script setup lang="ts">
const props = defineProps(['error'])

const router = useRouter();

const updatePage = () => {
  router.go()
}
</script>

<template>
  <NuxtLayout>
  <div class="page-error">
    <LayoutWrapperPage >
      <BaseWrapperWithDogs image="puppy_in_pool">
        <div class="page-error__row">
          <div class="page-error__title">
          <span v-if="error.statusCode === 404">
            Такая страница не существует
          </span>
            <span v-else>Ууупс, произошла ошибка</span>
          </div>
          <div class="page-error__code">
            <span>{{error.statusCode}}</span>
          </div>
          <div class="page-error__descr">
            <span>Обновите страницу или перейдите на главную</span>
          </div>
          <div v-if="error.statusMessage" class="page-error__line"/>
          <div v-if="error.statusMessage" class="page-error__text">
            <span>{{error.statusMessage}}</span>
          </div>
          <div v-if="error.message" class="page-error__text">
            <span>message: {{error.message}}</span>
          </div>
          <div class="page-error__action">
            <BaseButton v-if="error.statusCode !== 404" type="teriary" text="Обновить страницу" @click="updatePage" />
            <BaseButton type="secondary" text="Перейдите на главную" to="/" />
          </div>
        </div>

      </BaseWrapperWithDogs>

    </LayoutWrapperPage>

  </div>
  </NuxtLayout>

</template>

<style scoped lang="scss">
.page-error {
  width: 100%;
  &__row {
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media (max-width: $sm) {
      z-index: 2;
      backdrop-filter: blur(5px);
      padding: 15px;
      border-radius: 15px;
      box-shadow: $box-shadow-middle;
    }
  }
  &__title {
    @include h2;
  }
  &__descr {
    @include h4;
  }
  &__code {
    @include h1;
  }
  &__line {
    width: 100%;
    height: 1px;
    background-color: $violet;
  }
  &__text {
    @include h5;
  }
  &__action {
    display: flex;
    gap: 20px;
    @media (max-width: $xs) {
      flex-direction: column;
      gap: 5px;
    }
  }
}
</style>