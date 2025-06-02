<script setup lang="ts">
defineProps(['error'])

const router = useRouter();

const updatePage = () => {
  router.resolve({name: 'publisher'}).href
}
</script>

<template>
  <NuxtLayout>
  <div class="page-error">
    <LayoutWrapperPage >
      <BaseWrapperWithDogs image="dolmatian">
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
          <div class="page-error__text">
            <span>{{error.message}}</span>
          </div>
          <div class="page-error__action">
            <BaseButton v-if="error.statusCode !== 404" type="teriary" text="Обновить страницу" @click="updatePage" />
            <BaseButton type="teriary" text="Перейдите на главную" to="/" />
          </div>
        </div>

      </BaseWrapperWithDogs>

    </LayoutWrapperPage>

  </div>
  </NuxtLayout>

</template>

<style scoped lang="scss">
.page-error {
  &__row {
    display: flex;
    flex-direction: column;
    gap: 15px;
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
  &__action {
    display: flex;
    gap: 20px;
  }
}
</style>