<script lang="ts" setup>
import type {PropType} from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  listIncomplete: {
    type: Array as PropType<string[]>,
    default: null
  },
})

const emits = defineEmits(['create', 'change', 'close'])

const dataComplete = ref([
  {
    text: 'Заполнение названия питомника',
    type: 'name',
    status: '',
    required: true,
  },
  {
    text: 'Добавление фото баннера',
    type: 'photo_banner',
    status: '',
    required: true,
  },
  {
    text: 'Добавление фото в галерею',
    type: 'photos_gallery',
    status: '',
    required: true,
  },
  {
    text: 'Добавление Ваших питомцев',
    type: 'my_dogs',
    status: '',
    required: true,
  },
  {
    text: 'Заполнение главного фото',
    type: 'photo_preview',
    status: '',
    required: true,
  },
  {
    text: 'Добавление специализации',
    type: 'breed_specialisation',
    status: '',
    required: true,
  },
  {
    text: 'Добавление текста "О нас"',
    type: 'about_text',
    status: '',
    required: true,
  },
  {
    text: 'Добавление специализации',
    type: 'breed_specialisation',
    status: '',
    required: true,
  },
])
const initComplete = () => {
  console.log('initComplete', props.listIncomplete)
  dataComplete.value = dataComplete.value.map(item => {
    if(props.listIncomplete?.includes(item.type)) item.status = 'empty'
    else item.status = 'success'
    return item
  })
}
onMounted(() => {
  initComplete()
})
</script>

<template>
  <Teleport to="body">
    <BaseModal :is-show-modal="isShow" @close="emits('close')">
      <FormWindow modal>
        <template #title>
          Ещё не всё {{props.listIncomplete}}
        </template>
        <template #default>
          <div class="breeder-site__manage-incomplete">
            <div class="breeder-site__manage-incomplete__list">
              <div
                  class="breeder-site__manage-incomplete__item"
                  v-for="(item, index) in dataComplete"
                  :key="index"
              >
                <BaseIconCheck v-if="item.status === 'success'" class="incomplete-icon-check" />
                <BaseIconClose v-else class="incomplete-icon-close" />
                <div class="breeder-site__manage-incomplete__item-name">
                  <span>{{item.text}}</span>
                </div>

              </div>
            </div>
          </div>
        </template>
      </FormWindow>
    </BaseModal>
  </Teleport>
</template>

<style scoped lang="scss">
.breeder-site__manage-incomplete {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__item {
    display: flex;
    gap: 5px;
    align-items: center;
  }

}
</style>