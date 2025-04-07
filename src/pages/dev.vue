<template>
  <div class="dev">
    <div class="dev-wrapper">
      <div class="dev-buttons">
        <p class="dev-buttons_text">
          Кнопки
        </p>
        <div class="dev-buttons__list dev-list">
          <div class="--dev-row">
            <BaseButton class="dev-buttons__item"
                        text="Button clickable"
                        type="primary"
                        to="/"
                        size="large"
            />
            <BaseButton class="dev-buttons__item"
                        text="Button disabled"
                        type="primary"
                        disabled
                        to="/"
                        size="large"
            />
          </div>
          <div class="--dev-row">
            <BaseButton class="dev-buttons__item"
                        text="Button non-clickable"
                        type="secondary"
                        size="large"
            />
            <BaseButton class="dev-buttons__item"
                        text="Button non-clickable"
                        type="secondary"
                        disabled
                        size="large"
            />
          </div>
          <div class="--dev-row">
            <BaseButton class="dev-buttons__item"
                        text="Button clickable"
                        type="teriary"
                        size="large"
                        to="/"
            />
            <BaseButton class="dev-buttons__item"
                        text="Button non-clickable"
                        type="teriary"
                        disabled
                        size="large"
            />
          </div>
        </div>
      </div>
      <div class="dev-inputs">
        <p class="dev-inputs_text">
          Инпуты
        </p>
        <div class="dev-inputs__list">
          <BaseInput title="Enter the value" :max-length="15" v-model="model" />
          <BaseInput title="Пароль" :max-length="15" v-model="model2" password />
          <BaseInput title="Disabled" disabled :max-length="15" v-model="model3" />
          <BaseInput :max-length="15" disabled v-model="model4" />
          <BaseInput title="Error" :max-length="15" :invalidText="invalidTextValue" v-model="model5" />
          <BaseInput title="Enter the value" show-fullnes :max-length="300" v-model="model6" />
        </div>
      </div>
      <div class="dev-switch">
        <p class="dev-switch__text">
          Switch
        </p>
        <div class="--dev-row">
          <BaseSwitch v-model="switchTrue" />
          <BaseSwitch v-model="switchFalse" />
        </div>
      </div>
      <div class="dev-textarea">
        <p class="dev-textarea_text">
          Текстовое поле
        </p>
        <div class="--dev-row">
          <BaseTextarea v-model="textarea"
                        title="Описание"
                        show-fullnes
                        :max-length="300"
          />
        </div>
      </div>
      <div class="dev-select">
        <p class="dev-select__text">
          Select
        </p>
        <div class="--dev-row">
          <!--<BaseSelect
            full-value
            placeholder="Выберите роль"
            v-model="selectType"
            :items="items"
            :disableSearch="false"
          />-->
          <BaseSelect
              full-value
              placeholder="Выберите роль"
              v-model="selectType"
              :items="items"
              multiple
              name="items"
          />
          {{selectType}}
          <BaseSelect
              full-value
              placeholder="Выберите роль"
              v-model="selectType1"
              :items="items1"
              name="items1"

          />
          {{selectType1}}

        </div>
        <div class="--dev-row">
          <BaseSelect
              full-value
              placeholder="Выберите роль"
              v-model="selectType2"
              :items="items2"
              multiple
              size="small"
              name="items2"
          />
          <BaseSelect
              full-value
              placeholder="Выберите роль"
              v-model="selectType3"
              :items="items3"
              size="small"
              name="items3"
          />
        </div>
      </div>
      <div class="dev-search">
        <p class="dev-search_text">
          Поиск
        </p>
        <div class="--dev-row">
          <BaseSearch v-model="search" />
          <BaseSearch v-model="search1" disabled />
        </div>
      </div>
    </div>
    <div class="dev-nav">
      <router-link to="/dashboard/profile">Перейти в профиль</router-link>
      <router-link to="/dashboard/panel-user">Перейти в панель управления</router-link>
      <router-link to="/dashboard/dev">DEV</router-link>
      <router-link to="/dashboard/registration">registration</router-link>
      <router-link to="/dashboard/authorization">authorization</router-link>
      <router-link to="/dashboard/recovery-password">recovery-password</router-link>
      <router-link to="/dashboard/new-password">new-password</router-link>
      <router-link to="/dashboard/confirmation-mail">confirmation-mail</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, computed} from 'vue';


const model = ref('');
const model2 = ref('');
const model3 = ref('');
const model4 = ref('No enter Disabled');
const model5 = ref('');
const model6 = ref('Я в своём познании настолько преиcполнился, что миллионы миллиардов планет');
const invalidTextValue = computed(()=> {
  return model5.value? "Error message": ''
})

const textarea = ref('')

const search = ref('')
const search1 = ref('')

const switchTrue = ref(true);
const switchFalse = ref(false);

const selectType = ref([
  {
    text: 'Администратор',
    value: 1,
  },
  {
    text: 'Менеджер',
    value: 2,
  }
])
const items = [
  {
    text: 'Администратор',
    value: 1,
  },
  {
    text: 'Менеджер',
    value: 2,
  },
  {
    text: 'Администратор2',
    value: 3,
  },
  {
    text: 'Менеджер2',
    value: 4,
  },
  {
    text: 'Администратор2',
    value: 5,
  },
  {
    text: 'Менеджер2',
    value: 6,
  },
];
const selectType1 = ref({
  text: 'Администратор',
  value: 1,
})
const items1 = [
  {
    text: 'Администратор',
    value: 1,
  },
  {
    text: 'Менеджер',
    value: 2,
  },
  {
    text: 'Администратор2',
    value: 3,
  },
  {
    text: 'Менеджер2',
    value: 4,
  },
];
const selectType2 = ref([{
  text: 'Администратор',
  value: 1,
}])
const items2 = [
  {
    text: 'Администратор',
    value: 1,
  },
  {
    text: 'Менеджер',
    value: 2,
  },
  {
    text: 'Администратор2',
    value: 3,
  },
  {
    text: 'Менеджер2',
    value: 4,
  }
];
const selectType3 = ref( {
  text: 'Менеджер',
  value: 2,
})
const items3 = [   {
  text: 'Администратор',
  value: 1,
},
  {
    text: 'Менеджер',
    value: 2,
  },
  {
    text: 'Администратор2',
    value: 3,
  },
  {
    text: 'Менеджер2',
    value: 4,
  },];
</script>

<style scoped lang="scss">
@use 'sass:map';

.dev {
  padding-top: 84px;
  background: #ddd;
  &-nav {
    position: fixed;
    top: 100px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &-wrapper {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

  }
  &-list {
    margin-top: 20px;
  }
  .--dev-row {
    margin-top: 20px;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  &-inputs {
    &__list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  &-select {
    min-height: 350px;
  }

}
</style>