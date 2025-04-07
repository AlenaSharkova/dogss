<script setup lang="ts">
const props = defineProps({
  name: String,
  active: Boolean,
})
</script>

<template>
  <svg v-if="name == 'main'" class="icon-menu-mob" :class="{active: active}"
       width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2626_2985)">
      <path d="M10.5001 18.9997V13.9997H14.5001V18.9997C14.5001 19.5497 14.9501 19.9997 15.5001 19.9997H18.5001C19.0501 19.9997 19.5001 19.5497 19.5001 18.9997V11.9997H21.2001C21.6601 11.9997 21.8801 11.4297 21.5301 11.1297L13.1701 3.59973C12.7901 3.25973 12.2101 3.25973 11.8301 3.59973L3.4701 11.1297C3.1301 11.4297 3.3401 11.9997 3.8001 11.9997H5.5001V18.9997C5.5001 19.5497 5.9501 19.9997 6.5001 19.9997H9.5001C10.0501 19.9997 10.5001 19.5497 10.5001 18.9997Z" fill="#C8C5CC" />
    </g>
    <defs>
      <clipPath id="clip0_2626_2985">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>

  <svg v-else-if="name == 'payments'" class="icon-menu-mob" :class="{active: active}"
       width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2626_2990)">
      <path d="M10.5 16V8C10.5 6.9 11.39 6 12.5 6H21.5V5C21.5 3.9 20.6 3 19.5 3H5.5C4.39 3 3.5 3.9 3.5 5V19C3.5 20.1 4.39 21 5.5 21H19.5C20.6 21 21.5 20.1 21.5 19V18H12.5C11.39 18 10.5 17.1 10.5 16ZM13.5 8C12.95 8 12.5 8.45 12.5 9V15C12.5 15.55 12.95 16 13.5 16H22.5V8H13.5ZM16.5 13.5C15.67 13.5 15 12.83 15 12C15 11.17 15.67 10.5 16.5 10.5C17.33 10.5 18 11.17 18 12C18 12.83 17.33 13.5 16.5 13.5Z" fill="#C8C5CC" />
    </g>
    <defs>
      <clipPath id="clip0_2626_2990">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>

  <svg v-else-if="name == 'store'" class="icon-menu-mob" :class="{active: active}"
       width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2626_2995)">
      <path d="M5.50007 6H19.5001C20.0501 6 20.5001 5.55 20.5001 5C20.5001 4.45 20.0501 4 19.5001 4H5.50007C4.95007 4 4.50007 4.45 4.50007 5C4.50007 5.55 4.95007 6 5.50007 6ZM20.6601 7.8C20.5701 7.34 20.1601 7 19.6801 7H5.32007C4.84007 7 4.43007 7.34 4.34007 7.8L3.34007 12.8C3.22007 13.42 3.69007 14 4.32007 14H4.50007V19C4.50007 19.55 4.95007 20 5.50007 20H13.5001C14.0501 20 14.5001 19.55 14.5001 19V14H18.5001V19C18.5001 19.55 18.9501 20 19.5001 20C20.0501 20 20.5001 19.55 20.5001 19V14H20.6801C21.3101 14 21.7801 13.42 21.6601 12.8L20.6601 7.8ZM12.5001 18H6.50007V14H12.5001V18Z" fill="#C8C5CC" />
    </g>
    <defs>
      <clipPath id="clip0_2626_2995">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>

  <svg v-else-if="name == 'profile'" class="icon-menu-mob" :class="{active: active}"
       width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2626_3000)">
      <path d="M12.5 12C14.71 12 16.5 10.21 16.5 8C16.5 5.79 14.71 4 12.5 4C10.29 4 8.5 5.79 8.5 8C8.5 10.21 10.29 12 12.5 12ZM12.5 14C9.83 14 4.5 15.34 4.5 18V19C4.5 19.55 4.95 20 5.5 20H19.5C20.05 20 20.5 19.55 20.5 19V18C20.5 15.34 15.17 14 12.5 14Z" fill="#C8C5CC" />
    </g>
    <defs>
      <clipPath id="clip0_2626_3000">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>

  <svg v-else-if="name == 'transactions'" class="icon-menu-mob" :class="{active: active}"
       width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1031_15126)">
      <path d="M12.5 2C7 2 2.5 6.5 2.5 12C2.5 17.5 7 22 12.5 22C18 22 22.5 17.5 22.5 12C22.5 6.5 18 2 12.5 2ZM16.05 15.8L11.97 13.29C11.67 13.11 11.49 12.79 11.49 12.44V7.75C11.5 7.34 11.84 7 12.25 7C12.66 7 13 7.34 13 7.75V12.2L16.84 14.51C17.2 14.73 17.32 15.2 17.1 15.56C16.88 15.91 16.41 16.02 16.05 15.8Z" fill="#C8C5CC"/>
    </g>
    <defs>
      <clipPath id="clip0_1031_15126">
        <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
      </clipPath>
    </defs>
  </svg>

</template>

<style scoped lang="scss">
@use 'sass:map';

.icon-menu-mob {
  width: 100%;
  height: 100%;
  path {
    transition: fill 0.3s;
  }
  &.active {
    path {
      fill: #2D2D2D;
    }
  }
}
</style>