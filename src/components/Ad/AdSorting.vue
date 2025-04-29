<script setup lang="ts">

const router = useRouter();
const route = useRoute();

const sortingList = reactive([
  {
    text: 'Сначала дешевле',
    value: 'priceUp'
  },
  {
    text: 'Сначала дороже',
    value: 'priceDown'
  },
  {
    text: 'Сначала старые',
    value: 'createdAtDown'
  },
  {
    text: 'Сначала новые',
    value: 'createdAtUp'
  },
])
const selectedSort = ref(route.query.sorting as string || 'createdAtUp')

const sortingAd = (value: string) => {
  console.log('click', value)
  router.push({name: 'catalog', query: {
      ...route.query,
      sorting: value
    }})
}

watch(() => selectedSort.value,
    (newValue) => {
      if(newValue) {
        sortingAd(newValue)
      }
    })

</script>

<template>
  <div class="ad-sorting">
    <div class="ad-sorting__wrapper">
      <div class="ad-sorting__block">
        <BaseSelect
            v-model="selectedSort"
            name="sorting"
            :items="sortingList"
            placeholder="Сортировка"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>