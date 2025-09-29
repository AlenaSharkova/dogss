<script setup lang="ts">
import type {PropType} from "vue";
import type {AdCommentView} from "~/struct/Ad/AdCommentStruct";

defineProps({
  comments: {
    type: Object as PropType<AdCommentView[]>,
    required: true
  }
})

</script>

<template>
  <div class="user-comments-gallery">
    <swiper
        v-if="comments?.length"
        class="user-comments-gallery__swiper"
        centered-slides
        :space-between="20"
        :slides-per-view="2"
    >
      <swiper-slide class="user-comments-gallery__slide" v-for="(item, index) in comments" :key="index">
        <UserPageCommentsItem :comment="item" />
      </swiper-slide>
    </swiper>
    <CommonEmptyBlock
        v-else
        text="Отзывов пока нет"
        mini-style
    />
  </div>

</template>

<style scoped lang="scss">
.user-comments-gallery {
  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px 20px 10px;
  }
}
</style>