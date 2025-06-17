<script setup lang="ts">

import FormWrapper from "~/components/Form/FormWindow.vue";
import FormWindow from "~/components/Form/FormWindow.vue";
import breeds from '@/demoData/breeds.json'
const form = reactive({
  name: ''
})
fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      console.log('data.message', data.message)
      const breedsObj = data.message;
      for (let breed in breedsObj) {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        //dropdown.appendChild(option);
      }
    });

const a = breeds.items.map((item, index) => {
  return  {
    id: index+1,
    name: item.name,
    //child_breeds: item.child_breeds,
  }
})
console.log(JSON.stringify(a))
</script>

<template>
  <div class="form-test">
    <FormWindow>
      <template #title>
        Создать питомник
      </template>
      <template #subtitle>
      </template>
      <template #default>
        <BaseInput v-model="form.name" title="Имя" >

        </BaseInput>
        <BaseInput v-model="form.name" title="Имя" >

        </BaseInput>
        <BaseInput v-model="form.name" title="Имя" >

        </BaseInput>
      </template>

    </FormWindow>
  </div>
</template>

<style scoped lang="scss">

</style>