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
    value: 'createdAtUp'
  },
  {
    text: 'Сначала новые',
    value: 'createdAtDown'
  },
])
const selectedSort = ref(route.query.sorting as string || 'createdAtDown')

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
        <BaseSorting
            v-model="selectedSort"
            name="sorting"
            :list="sortingList"
            placeholder="Сортировка" />
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