<script setup lang="ts">
import { ref, watch, PropType } from "vue"; // Импортируем ref и watch
import { Cropper } from "vue-advanced-cropper";
import 'vue-advanced-cropper/dist/style.css'; // Не забудьте импортировать стили

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  imgSrc: {
    type: [String, null] as PropType<String | null>,
    default: ''
  },
  originalFile: {
    type: [File, null] as PropType<File | null>,
    default: null
  }
})

const emit = defineEmits(['crop-and-upload', 'close']) // Объявляем событие

const croppedImgUrl = ref<string | null>(null) // Типизируем
const cropper = ref<InstanceType<typeof Cropper> | null>(null) // Типизируем референс

// Функция для обновления предпросмотра
const updatePreview = () => {
  if (cropper.value) {
    const { canvas } = cropper.value.getResult();
    if (canvas) {
      croppedImgUrl.value = canvas.toDataURL('image/jpeg');
    }
  }
}

// Вызываем updatePreview, когда cropper готов или imgSrc меняется
watch(() => props.imgSrc, (newVal) => {
  if (newVal) {
    // Даем Vue-advanced-cropper время на инициализацию
    setTimeout(() => {
      updatePreview();
    }, 100);
  }
}, { immediate: true }); // immediate: true - вызовет хэндлер сразу при создании компонента

// Метод, который будет вызываться родительским компонентом или кнопкой "Обрезать"
const getCrop = () => {
  if (!cropper.value) {
    console.warn('Cropper instance is not ready.');
    return;
  }

  const { coordinates, canvas } = cropper.value.getResult();

  if (coordinates && canvas) {
    // Обновляем предпросмотр
    croppedImgUrl.value = canvas.toDataURL('image/jpeg');

    // Отправляем событие родительскому компоненту
    // Родительский компонент будет отвечать за отправку на бэкенд
    emit('crop-and-upload', {
      //originalFile: props.originalFile,
      coordinates: {
        left: coordinates.left,
        top: coordinates.top,
        width: coordinates.width,
        height: coordinates.height,
      },
      //croppedCanvasDataUrl: croppedImgUrl.value // Если родительскому компоненту нужен предпросмотр
    });
  } else {
    console.error('Failed to get crop coordinates or canvas.');
  }
}

// expose getCrop to parent component if needed (e.g., if parent has the "Save" button)
defineExpose({
  getCrop
})

</script>

<template>
  <BaseModal :is-show-modal="isShow" @close="emit('close')" >
    <FormWindow modal>
      <template #title>Область фото</template>
      <template #subtitle>Выберите область фото, которая будет отображена</template>
      <div class="common-advanced-cropper">

        <div class="cropped-preview">
          <h3>Предпросмотр:</h3>
          <img :src="croppedImgUrl || '/placeholder.png'" alt="Обрезанное изображение">
        </div>

        <Cropper
            ref="cropper"
            :src="imgSrc"
            :stencil-props="{
              aspectRatio: 1,
              movable: true,
              resizable: true
            }"
            :background-wrapper="{
              movable: true
            }"
            :zoomable="true"
            :scalable="true"
            :wheel-zoom-enabled="false"
            :min-height="200"
            :min-width="200"
            class="example-cropper"
            @change="updatePreview"
        />
      </div>
      <template #action-buttons>
        <BaseButton @click="getCrop" text="Обрезать и сохранить" size="small" type="violet"></BaseButton>
      </template>

    </FormWindow>
  </BaseModal>
</template>

<style scoped lang="scss">
.common-advanced-cropper {
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: $sm) {
    width: 100%;
  }
}
.cropped-preview {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  img {
    width: 150px; /* Фиксированный размер для предпросмотра */
    height: 150px;
    border: 1px solid #ddd;
    object-fit: cover;
    background-color: #f9f9f9; /* На случай, если нет изображения */
  }
}
.example-cropper {
  width: 100%;
  max-width: 600px;
  height: 400px;
  background: #f0f0f0;
  border: 2px dashed #f0ad4e;
}
</style>
