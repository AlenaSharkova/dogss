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
      <div class="user-comments-item__ad">
        <p class="user-comments-item__ad-name">
          <span class="ad-text">Сделка </span>
          <router-link :to="`/catalog/${comment.ad_info.id}`" class="ad-name"> "{{comment.ad_info.name}}"</router-link>
        </p>
        <p class="user-comments-item__ad-date">
          <span>от </span>
          <span class="date-value">{{formatDate(comment.ad_info.created_at)}}</span>
          <span class="status-value"> состоялась</span>
        </p>
      </div>
      <router-link :to="`/user/${comment.commenter.id}`" class="user-comments-item__user">
        <span>{{comment.commenter.full_name}}</span>
      </router-link >
      <div class="user-comments-item__rating">
        <div v-for="i in 5" class="user-comments-item__rating-icon">
          <BaseIconStar class="star-icon" :active="i <= comment.rating"/>
        </div>
      </div>
      <div v-if="comment.text" class="user-comments-item__text">
        ""{{comment.text}}""
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
  &__ad {
    @include text-small;
    &-name {
      transition: all 0.4s;
      &:hover {
        color: $link;
        font-weight: 500;
        .ad-text {
          transition: all 0.4s;
          color: $link;
          font-weight: 600;
        }
      }
      .ad-text {
        color: $violet;
        font-weight: 600;
      }
    }
    &-date {
      color: $grey;
      .date-value {
        font-style: italic;
      }
      .status-value {
        color: $violet;
        font-weight: 600;
      }
    }
  }
  &__user {
    margin-top: 10px;
    color: $violet;
    @include subtitle-small(600);
    transition: all 0.4s;
    &:hover {
      color: $link;
    }
  }
  &__rating {
    margin-top: 5px;
    display: flex;
    &-icon {
      width: 40px;
      .star-icon {
        color: $grey-lite;
      }
    }
  }
  &__text {
    margin-top: 5px;
    @include text-normal(500);
    font-style: italic;
  }
}
</style>