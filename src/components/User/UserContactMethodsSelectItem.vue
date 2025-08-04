<script setup lang="ts">

import type {IContactValue} from "~/struct/Common/IValueType";
import {ruleNotEmpty, ruleValidEmail} from "~/utils/commonRules";
import type {PropType} from "vue";
import type {UserItemFullStruct} from "~/struct/User/UserItemStruct";
import {formatPhone, formatPhoneApi} from "~/utils/formatData";
import BaseIconCopy from "~/components/Base/BaseIcon/BaseIconCopy.vue";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
  validInput: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String as PropType<IContactValue | 'copy'>,
    default: '',
  },
  type: {
    type: String as PropType<'view' | 'change' | 'share'>,
    default: 'view',
  },
})
const emit = defineEmits(['saveChange', 'editChange', 'closeEditChange'])
const saveChangeMethod = (idSelect: IContactValue) => {
  emit("saveChange", idSelect)
}
const toggleEditValueMethod = (idSelect: IContactValue) => {

  if(props.isEdit) emit("closeEditChange", idSelect)
  else emit("editChange", idSelect)
}
const formatedValue = (value: string) => {
  if(value.startsWith("https://vk.com/") && props.name === 'vk') {
    return value.replace("https://vk.com/", "@")
  } else if(props.name === 'phone' || props.name === 'whatsapp') {
    return formatPhone(value)
  } else if( props.name === 'tg' && value ) {
    return "@" + value
  } else return value
}
</script>

<template>
    <div
        class="contact-methods-select__item"
        :class="[
          {'--selected': isSelect,
          '--edit': isEdit,
          },
          `--${name}`,
          `--${type}`
         ]"
    >
      <div class="contact-methods-select__item-wrapper">
        <div v-if="type === 'view'" class="contact-methods-select__item-action">
          <div class="contact-methods-select__item-action__transition">
            <BaseIconTransition />
          </div>
          <CommonCopy
              v-if="type === 'view'"
              :text="formatedValue(value)"
          />
        </div>
        <div
            class="contact-methods-select__item-img"
            :class="[
              {'--selected': isSelect,
              '--edit': isEdit},
              `--${name}`
             ]"
        >
          <BaseIconCopy
              class="icon"
              v-if="name === 'copy'"/>
          <BaseIconContacts v-else class="icon" :name="name" />
        </div>
        <Transition mode="out-in" name="fade">
          <div v-if="isEdit" class="contact-methods-select__item-change">
            <slot></slot>
            <BaseButton
                @click.stop="saveChangeMethod('email')"
                text="OK"
                type="secondary"
                size="small"
                class="contact-methods-select__item-change__btn"
            />
          </div>
          <div v-else class="contact-methods-select__item-value">
            <p v-if="type == 'share'">{{ value }}</p>
            <p v-else>{{ formatedValue(value) }}</p>
          </div>
        </Transition>
      </div>
        <div v-if="(isEdit || value) && type == 'change'" @click.stop="toggleEditValueMethod('email')" class="contact-methods-select__item-edit">
          <Transition name="fade" mode="out-in">
            <BaseIconChange v-if="!isEdit" class="icon" />
            <BaseIconClose v-else color="dark" class="icon" />
          </Transition>
        </div>
    </div>
</template>

<style scoped lang="scss">
$color-email: #E0A96F;
$color-phone: #1b0e43;
$color-copy: #afa6d3;
$color-tg: #27a7e7;
$color-whatsapp: #2cb742;
$color-vk: #4d7198;

.contact-methods-select__item {
  border-radius: 15px;
  background-color: $white-text;
  box-shadow: $box-shadow-middle;
  transition: all .3s;
  cursor: pointer;
  height: 205px;
  padding: 20px;
  position: relative;
  flex: 10%;
  overflow: hidden;
  &:hover {
    box-shadow: $box-shadow-dark;
  }
  &.--view {
    height: 150px;
    flex: 1;
    .contact-methods-select__item-img {
      padding-top: 10px;
    }
  }
  &.--share {
    padding: 12px;
    height: 125px;
    flex: 1;
    .contact-methods-select__item-img {
      padding-top: 5px;
    }
    .contact-methods-select__item-value {
      @include text-normal();
    }
  }
  &.--edit {
    flex: 23%;
  }
  &.--selected {
    .contact-methods-select__item-value {
      color: $white-text;
    }
    &.--vk {
      background-color: $color-vk;
    }
    &.--tg {
      background-color: $color-tg;
    }
    &.--whatsapp {
      background-color: $color-whatsapp;
    }
    &.--email {
      background-color: $color-email;
    }
    &.--phone {
      background-color: $color-phone;
    }
    &.--copy {
      background-color: $color-copy;
    }
  }
  &-wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &-action {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    gap: 5px;
    flex-direction: column;
    &__transition {
      width: 35px;
      height: 35px;
      box-shadow: $box-shadow-lite;
      background-color: $violet-opacity-max;
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      svg {
        width: 22px;
        color: white;
      }
    }
  }

  &-img {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4CAF50;
    padding-top: 20px;
    transition: all .3s;
    &.--edit {
      padding-top: 0;
      transform: scale(0.6);
    }
    &.--vk {
      .icon {
        color: $color-vk;
      }
    }
    &.--tg {
      .icon {
        color: $color-tg;
      }
    }
    &.--whatsapp {
      .icon {
        color: $color-whatsapp;
      }
    }
    &.--phone {
      .icon {
        color: $color-phone;
      }
    }
    &.--email {
      .icon {
        color: $color-email;
      }
    }
    &.--selected {
      .icon {
        color: $white-text;
      }
    }

    .icon {
      width: 44px;
      color: #4CAF50;
    }
  }
  &-value {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    @include h6;

    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  &-change {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 17px;
    width: auto;
    align-items: center;

    &__btn {
      width: 70px;
    }

  }
  &-edit {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
    width: 30px;
    height: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(6px);
    box-shadow: $box-shadow-middle;
    transition: all .3s;
    background-color: rgba(227, 237, 227, 0.6);
    cursor: pointer;
    .icon {
      width: 18px;
      height: 18px;
    }
    &:hover {
      box-shadow: $box-shadow-dark;
    }
  }
}
</style>