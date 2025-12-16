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
})
const emits = defineEmits(['save-about-text'])
const selectBreeds = defineModel<ISelectComponent[]>({default: []})

const breedsStore = useBreedsStore()

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