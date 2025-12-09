<script setup lang="ts">
import {computed, defineProps, type PropType, ref} from "vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";

const props = defineProps({
  text: {
    type: [String, null] as PropType<String | null>,
    default: ''
  },
  breed: {
    type: Object as PropType<ISelectComponent[]>,
    default: []
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
  <div class="user-page__about">
    <div v-if="text" class="user-page__about-final">
      <div class="user-page__about-final__text">
        <span>{{text}}</span>
      </div>
      <div class="user-page__about-final__breed">
        <div class="user-page__about-final__breed-text">
          <span>Специализация: </span>
        </div>
        <div class="user-page__about-final__breed-list">
          <BaseMiniBlock
              v-for="(item, index) in selectBreeds"
              :key="index"
              :text="item.text"
          />
        </div>
      </div>

    </div>
    <div v-if="typeAction !== 'view'" class="user-page__about-manage">
      <div class="user-page__about-manage__breed">
        <BaseSelect
            v-if="breedsList?.length"
            :items="breedsList"
            v-model="selectBreeds"
            show-search
            full-value
            multiple
            name="breed"
            placeholder="Выберите породу специализации"
        />
      </div>
      <div class="user-page__about-manage__content">
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
      </div>

    </div>



    <!--породы какие-->
  </div>
</template>

<style scoped lang="scss">
.user-page__about {
  &-final {
    &__breed {
      display: flex;
      gap: 10px;
    }
  }

}
</style>