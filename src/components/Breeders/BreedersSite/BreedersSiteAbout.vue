<script setup lang="ts">
import {computed, defineProps, type PropType, ref} from "vue";
import type {ISelectComponent} from "~/struct/Common/ISelectComponent";

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
    <div class="breeder-about-final">
      <div v-if="text" class="breeder-about-final__text">
        <span>{{text}}</span>
      </div>
      <div v-if="selectBreeds?.length" class="breeder-about-final__breed">
        <div class="breeder-about-final__breed-text">
          <span>Специализация: </span>
        </div>
        <div class="breeder-about-final__breed-list">
          <BaseMiniBlock
              v-for="(item, index) in selectBreeds"
              :key="index"
              :text="item.text"
          />
        </div>
      </div>
    </div>
    <div v-if="typeAction !== 'view'" class="breeder-about-manage">
      <div class="breeder-about-manage__breed">
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
      <div class="breeder-about-manage__content">
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
.breeder-about {
  &-final {
    &__breed {
      display: flex;
      gap: 10px;
      &-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    }
  }

}
</style>