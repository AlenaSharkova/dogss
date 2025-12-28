<script setup lang="ts">
import {computed, defineProps, type PropType, ref} from "vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";
import BaseWrapperIconBlur from "~/components/Base/BaseIcon/BaseWrapperIconBlur.vue";

const props = defineProps({
  text: {
    type: [String, null] as PropType<String | null>,
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

const breedsList = computed(() =>  breedsStore.breedsList)

const applyNewAbout = () => {
  //textAboutAccept.value = textAboutInput.value
  isShowInput.value = false
  emits('save-about-text', textAboutInput.value)
}

</script>

<template>
  <div class="breeder-about">
    <div class="breeder-about__breed">
      <div v-if="selectBreeds?.length" class="breeder-about__breed-final">
        <div class="breeder-about__breed-final__text">
          <span>Специализация: </span>
        </div>
        <div class="breeder-about__breed-final__list">
          <BaseMiniBlock
              v-for="(item, index) in selectBreeds"
              :key="index"
              :text="item.text"
          />
        </div>
      </div>
      <div v-if="typeAction !== 'view'" class="breeder-about__breed-manage">
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

    </div>

    <div class="breeder-about__text">
      <div v-if="text && !isShowInput" class="breeder-about__text-final">
        <span>{{text}}</span>
      </div>
      <div v-if="typeAction !== 'view'" class="breeder-about__text-manage">
        <BaseTextarea
            v-if="isShowInput"
            v-model="textAboutInput"
            :max-length="600"
            title="Текст о нас" />
        <BaseButton
            v-if="isShowInput"
            text="Применить"
            @click="applyNewAbout"
            type="teriary"
            unfull
        />
        <BaseButton
            v-else
            type="teriary"
            unfull
            :text="textAboutInput? 'Изменить': 'Ввести'"
            @click="isShowInput = true"
        />
        <BaseWithMiniPopup text="45"/>
        <BaseWrapperIconBlur>
          <BaseIconChange slot="default" />
        </BaseWrapperIconBlur>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.breeder-about {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__breed {
    &-final {
      display: flex;
      gap: 10px;
      align-items: center;
      &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    }
  }
  &__text {
    display: flex;
    flex-wrap: wrap;
    &-manage {
      flex: 1;
    }
  }
}
</style>