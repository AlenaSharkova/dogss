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
    <swiper class="user-comments-gallery__swiper">
      <swiper-slide class="user-comments-gallery__slide" v-for="(item, index) in comments" :key="index">
        <UserPageCommentsItem :comment="item" />
      </swiper-slide>
    </swiper>
  </div>

</template>

<style scoped lang="scss">
.user-comments-gallery {
  &__slide {
    padding: 0 20px 20px 10px;
  }
}
</style>