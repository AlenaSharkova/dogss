<script setup lang="ts">
import type {PropType} from "vue";
import {AdCommentView} from "~/server/struct/AdCommentStruct";

defineProps({
  comment: {
    type: Object as PropType<AdCommentView>,
    required: true
  }
})
</script>

<template>
  <div class="user-comments-item">
    <div class="user-comments-item__wrapper">
      <div class="user-comments-item__rating">
        <div v-for="i in 5" class="user-comments-item__rating-icon">
          <BaseIconStar :active="i <= comment.rating"/>
        </div>
      </div>
      <div class="user-comments-item__text">
        {{comment.text}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-comments-item {
  width: 400px;
  min-height: 150px;
  background-color: $white-text;
  box-shadow: $box-shadow-middle;
  border-radius: 15px;
  &__wrapper {
    padding: 24px;
  }
  &__rating {
    display: flex;
    &-icon {
      width: 40px;
    }
  }
}
</style>