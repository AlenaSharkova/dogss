<script setup lang="ts">
import {ref, computed} from 'vue';
import {useAdStore} from "~/stores/ad.store";
import AdWrapperList from "~/components/Ad/AdWrapperList.vue";
import dayjs from "dayjs";
import CartAdItem from "~/components/Cart/CartAdItem.vue";

const ad = ref(null)
const users = ref(null)
await $fetch<any>(`/api/ad`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  baseURL: 'http://localhost:3000/',
}).then((res) => {
  ad.value = res
  console.log('res', res)
})
    .catch((err: Error) => console.log('err', err));

await $fetch<any>(`/api/users`, {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  baseURL: 'http://localhost:3000/',
}).then((res) => {
  users.value = res
  console.log('res', res)
})
    .catch((err: Error) => console.log('err', err));

const adStore = useAdStore()
adStore.updateAdList()


const adList = computed(() => adStore.adCatalogList )

const updateList = () => {
  adStore.updateAdList()
}

const regionsStore = useRegionsStore()

const regionsListFull = computed<any>(() => regionsStore.regionsListFull)

await regionsStore.updateRegionsListFull()

const selectRegion = ref([])
</script>


<template>
  <div class="dev-new">
    <div class="dev-wrapper">
      <div class="dev-cart-item">
        <p class="dev-cart-item_text">
          Карточка
        </p>
        <div class="dev-cart-item__list dev-list">
          <div class="--dev-row">
            <!--
            <CartItem />
            -->
            {{ users }}
            {{ ad }}
            ///adList
            {{adList}}<br>
            <p>{{ dayjs.duration(200).humanize() }}</p>
            <BaseButton type="primary" @click="updateList()"  text="Обновить"/>
<br>
            <AdWrapperList>
              <CartAdItem
                  v-for="(item, index) in adList"
                  :key="index"
                  :item="item" />
            </AdWrapperList>
            RegionsSelect
            <BaseSelect
                v-if="regionsListFull?.length"
                full-value
                placeholder="Выберите регион"
                v-model="selectRegion"
                :items="regionsListFull"
                multiple
                show-search
                name="region"
                is-enclosure
            >
              <RegionsSelect/>
            </BaseSelect>
            <RegionsSelect />
          </div>
          <div class="--dev-row">


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
    margin: auto;
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