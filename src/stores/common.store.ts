import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";


export const useCommonStore = defineStore('commonStore', () => {

  const isShowMenu = ref(false)

  const isShowMobileMenu = ref(false)
  const isScrolled = ref(false)
  const showMobileMenu = () => {
    isShowMobileMenu.value = true
  }
  const closeMobileMenu = () => {
    isShowMobileMenu.value = false
  }

  const isInited = ref(false);
  const isHiddenHeader = ref(false);
  const isHiddenHeaderSite = ref(false);
  let scrollTop = ref(0)
  const handleScroll = () => {
    scrollTop.value = window.scrollY
    isScrolled.value = window.scrollY > 200
  };
  watch(() => scrollTop.value,
      (newValue, oldValue) => {
        isHiddenHeader.value = newValue > oldValue && isScrolled.value;
        isHiddenHeaderSite.value = isScrolled.value;
      }
  )

  onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', () => handleScroll());
    isInited.value = true;
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', () => handleScroll());
  });
  return {
      isHiddenHeader,
      isHiddenHeaderSite,
    isScrolled
  }
})
