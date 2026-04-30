<script setup lang="ts">
import {computed, defineProps, type PropType, ref} from "vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";
import BaseWrapperIconBlur from "~/components/Base/BaseWrapperIconBlur.vue";

const props = defineProps({
  text: {
    type: [String, null] as PropType<string | null>,
    default: ''
  },
  typeAction: {
    type: String as PropType< 'create' | 'change' | 'view'>,
    default: 'create'
  },
})
const emits = defineEmits(['save-about-text'])
const selectBreeds = defineModel<ISelectComponent[]>({default: []})

const breedsStore = useBreedsStore()

const textAboutInput = ref('')
const textAboutAccept = ref('')
const isShowInput = ref(false)
const isShowBreedSelect = ref(false)

const breedsList = computed(() =>  breedsStore.breedsList)

const applyNewAbout = () => {
  //textAboutAccept.value = textAboutInput.value
  isShowInput.value = false
  emits('save-about-text', textAboutInput.value)
}

const clearNewAbout = () => {
  textAboutInput.value = ''
  isShowInput.value = false
}
const toggleAboutInput = () => {
  if(!isShowInput.value) {
    textAboutInput.value = textAboutAccept.value || props.text || ''
    isShowInput.value = true
  } else {
    isShowInput.value = false
  }
}
const toggleBreedSelect = () => {
  isShowBreedSelect.value = !isShowBreedSelect.value;
}
const disabledApplyText = computed(() => textAboutInput.value === props.text || textAboutInput.value === textAboutAccept.value)

const infoList = reactive([
  {
    title: "Город",
    value: 'Санк-Петербрг',
    icon: 'BaseIconGeo'
  },
  {
    title: "Город",
    value: 'Санк-Петербрг',
    icon: 'BaseIconGeo'
  },
  {
    title: "Город",
    value: 'Санк-Петербрг',
    icon: 'BaseIconGeo'
  },
])
</script>

<template>
  <div class="breeder-about">
    <div class="breeder-about__text">
      <div v-if="text" class="breeder-about__text-final">
        <div class="breeder-about__text-final__quotes">
          <BaseIconQuotes />
        </div>
        <div class="breeder-about__text-final__content">
          <pre>{{text}}</pre>
        </div>
        <div class="breeder-about__text-final__quotes --revert">
          <BaseIconQuotes is-revert />
        </div>
        <BaseWrapperIconBlur
            class="breeder-about__text-final__change"
            v-if="typeAction !== 'view'"
            @click="toggleAboutInput"
            color="light-teal"
        >
          <BaseIconChange class="icon" slot="default" />
        </BaseWrapperIconBlur>
      </div>
      <Transition name="fade">
        <div v-if="typeAction !== 'view' && isShowInput" class="breeder-about__text-manage">
          <BaseTextarea
              v-model="textAboutInput"
              showFullnes
              :max-length="600"
              title="Текст о нас" />
          <div class="breeder-about__text-manage__buttons">
            <BaseButton
                text="Применить"
                :disabled="disabledApplyText"
                @click="applyNewAbout"
                type="teriary"
                unfull
            />
            <BaseButton
                text="Отменить"
                @click="clearNewAbout"
                type="secondary"
                unfull
            />
            <!--<BaseButton
                v-if="text"
                text="Вернуться к начальному тексту"
                @click="clearNewAbout"
                type="secondary"
            />-->
          </div>
        </div>
      </Transition>
    </div>
    <div class="breeder-about__characteristic">
      <div class="breeder-about__characteristic-title">
        <span>Информация о Заводчике</span>
      </div>
      <div class="breeder-about__characteristic-list">
        <div v-for="characteristic in infoList" class="breeder-about__characteristic-block">
          <div class="breeder-about__characteristic-block__wrapper">
            <div class="breeder-about__characteristic-block__icon">
              <component class="characteristic-icon" :is="characteristic.icon" />
            </div>
            <div class="breeder-about__characteristic-block__content">
              <div class="breeder-about__characteristic-block__content-title">
                <span>{{ characteristic.title }}</span>
              </div>
              <div class="breeder-about__characteristic-block__content-value">
                <span>{{ characteristic.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="breeder-about__breed">

      <div class="breeder-about__breed-final">
        <div class="breeder-about__breed-final__text">
          <span>Специализация: </span>
        </div>

        <div class="breeder-about__breed-final__list">
          <BaseMiniBlock
              v-for="(item, index) in selectBreeds"
              :key="index"
              :text="item.text"
          />
          <div v-if="!selectBreeds.length">
            <span>Добавьте породы специализации</span>
          </div>
        </div>

        <BaseWrapperIconBlur
            v-if="typeAction !== 'view'"
            @click="toggleBreedSelect"
            class="breeder-about__breed-final__change"
            color="light-teal"
        >
          <BaseIconChange class="icon" slot="default" />
        </BaseWrapperIconBlur>
      </div>
      <Transition name="fade">
        <div v-if="typeAction !== 'view' && isShowBreedSelect" class="breeder-about__breed-manage">
          <BaseSelect
              v-if="breedsList?.length"
              :items="breedsList"
              v-model="selectBreeds"
              show-search
              full-value
              multiple
              name="breed"
              placeholder="Породы специализации"
          />
        </div>
      </Transition>

    </div>

  </div>
</template>

<style scoped lang="scss">
.breeder-about {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__text {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 15px;
    &-final {
      width: 100%;
      flex: 1;
      display: flex;
      gap: 10px;
      justify-content: space-between;
      padding: 15px 50px;
      border-radius: 24px;
      background: $light-teal-66;
      backdrop-filter: blur(6px);
      box-shadow: $box-shadow-lite;
      position: relative;
      min-height: 100px;
      &__quotes {
        width: 30px;
        &.--revert {
          margin-top: auto;
        }
      }
      &__content {
        width: 90%;
        @include text-normal();
        pre {
          font-family: "Montserrat", sans-serif;
        }
      }
      &__change {
        position: absolute;
        right: 10px;
        bottom: 10px
      }
    }
    &-manage {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      &__buttons {
        width: max-content;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        @media (max-width: $sm) {
          width: 100%
        }
      }
    }
  }
  &__characteristic {
    display: flex;
    gap: 10px;
    flex: 1;
    @include blur-block(15px);
    align-items: start;
    &-title {
      @include subtitle-small(500);
      color: $violet;
      margin-bottom: 10px;
    }
    &-list {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    &-block {
      flex: 1;

      &__wrapper {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      &__icon {
        @include blur-block(10px, $light-teal-99);
        border-radius: 50%;
        .characteristic-icon {
          color: $violet;
        }
      }
      &__content {
        flex-direction: column;
        gap: 8px;
        align-items: center;
      }
    }
  }
  &__breed {
    display: flex;
    flex-direction: column;
    gap: 15px;
    &-final {
      display: flex;
      gap: 10px;
      flex-direction: column;
      flex: 1;

      border-radius: 24px;
      padding: 15px;
      background: #ffffff55;
      backdrop-filter: blur(6px);

      box-shadow: $box-shadow-lite;
      &__text {
        @include subtitle-small(500);
        color: $violet;
      }
      &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      &__change {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
  }
}
</style>