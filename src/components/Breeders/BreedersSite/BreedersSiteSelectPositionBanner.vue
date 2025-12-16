<script lang="ts" setup>
import type {ICommonUpload} from "~/struct/Common/ICommonUpload";


const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(["close"])

const imageList = defineModel<ICommonUpload[]>({default: []});
/*
const positionsImage = ref([
  {
    text: "Слева",
    value: "left",
  },
  {
    text: "Поцентру",
    value: "center",
  },
  {
    text: "Справа",
    value: "right",
  },
])*/
//const defaultPosition = ref(positionsImage.value[2])
const positionMobile = ref('center center')
const positionTable = ref('center center')
const positionDesktop = ref('center center')

const send = () => {
  imageList.value = imageList.value.map((item) => {
    return {
      ...item,
      positionBanner: {
        mobile: positionMobile.value,
        table: positionTable.value,
        desktop: positionDesktop.value,
      },
    }
  })
  emit('close')
}
</script>

<template>
  <BaseModal :is-show-modal="isShow" @close="emit('close')" >
    <FormWindow modal>
      <template #title>Ваш баннер на разные экранах</template>
      <div class="breeder-site-size-banner">
        <div class="breeder-site-size-banner__subtitle">
          <span>Вы можете выбрать баннер на разных слева/поцентру/справа на экранах. Если вам нужны другие пропорции попробуйте обрезать изображение или обратитесь в поддержку</span>
        </div>
        <div class="breeder-site-size-banner__wrapper">
          <div class="breeder-site-size-banner__item --mobile">
            <div class="breeder-site-size-banner__item-title">
              Для мобильного экрана
            </div>
            <CommonSelectPositionImage v-model="positionMobile"/>
            <!--<BaseTabSwitch :items="positionsImage" v-model="positionMobile" name="positions-banner-mobile" is-small/>-->
            <div class="breeder-site-size-banner__item-image --mobile" >
              <img :src="imageList[0].url || ''" alt="Вид баннера на мобильном экране" :style="{'object-position': positionMobile }">
            </div>
          </div>
          <div class="breeder-site-size-banner__item --table">
            <div class="breeder-site-size-banner__item-title">
              Для планшетной версии
            </div>
            <CommonSelectPositionImage v-model="positionTable"/>

            <!--<BaseTabSwitch :items="positionsImage" v-model="positionTable" name="positions-banner-table" />-->
            <div class="breeder-site-size-banner__item-image --table">
              <img :src="imageList[0].url || ''" alt="Вид баннера на планшетном экране" :style="{'object-position': positionTable }">
            </div>
          </div>
          <div class="breeder-site-size-banner__item --desktop">
            <div class="breeder-site-size-banner__item-title">
              Для экрана компьютера
            </div>
            <CommonSelectPositionImage v-model="positionDesktop"/>

            <!--<BaseTabSwitch :items="positionsImage" v-model="positionDesktop" name="positions-banner-desktop" />-->
            <div class="breeder-site-size-banner__item-image --desktop">
              <img :src="imageList[0].url || ''" alt="Вид баннера на экране компьютера" :style="{'object-position': positionDesktop }">
            </div>
          </div>
        </div>
      </div>
      <template #action-buttons>
        <BaseButton type="violet" text="Подтвердить" @click="send"/>
        <BaseButton type="secondary" text="Сбросить" @click="emit('close')"/>
      </template>
    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.breeder-site-size-banner {
  &__wrapper {
   display: flex;
   gap: 20px;
   flex-wrap: wrap; // Позволит элементам переноситься на новую строку, если места мало
   @media (max-width: 545px) {
     flex-direction: column;
     flex-wrap: nowrap;
   }
  }
  &__item {

    background-color: #f0f4f7;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px; // Уменьшенный padding
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
    flex: 1; // Занимает доступное пространство
    min-width: 230px; // Минимальная ширина, чтобы не схлопывалось слишком сильно
    display: flex;
    flex-direction: column;
    align-items: center;

    &.--mobile {
      width: 100%;
      flex: 1;
    }
    &.--table {
      flex: 2;
    }
    &.--desktop {
      flex: 0 0 100%;
    }
    &-title {
      @include subtitle-small(500);
      margin-bottom: 10px;
    }
    &-image {
      width: 100%;
      position: relative;
      background-color: #ccc;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 10px;
      margin-top: 15px;

      &.--mobile {
        padding-bottom: 177.77%;
        @media (max-width: 545px) {
          padding-bottom: 88.89%;
          width: 50%;
        }
        @media (max-width: $xsss) {
          padding-bottom: 142.21%;
          width: 80%;
        }
      }
      &.--table {
        padding-bottom: 75%;
        margin-top: 71px;
      }
      &.--desktop {
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio (9/16 * 100%) */
      }

      img {
        height: 100%;
       // width: 100%;
        object-fit: cover;
        object-position: center;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        //object-fit: contain;
        //object-position: center;
        display: block;
      }


    }
  }
}
</style>