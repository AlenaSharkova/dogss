import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type {IUsersAlert} from "~/struct/Common/IUsersAlert";


export const useCommonStore = defineStore('commonStore', () => {

  const isShowMenu = ref(false)

  const isShowMobileMenu = ref(false)
  const isScrolled = ref(false)
  const isLoadingPage = ref(false)
  const showMobileMenu = () => {
    isShowMobileMenu.value = true
  }
  const closeMobileMenu = () => {
    isShowMobileMenu.value = false
  }
  const changeIsLoadingPage = (value: boolean) => {
    isLoadingPage.value = value
  }

  const isInit = ref(false);
  const isHiddenHeader = ref(false);
  const isHiddenHeaderSite = ref(false);
  let scrollTop = ref(0)
  const userAlerts = ref<IUsersAlert[]>([])
  const isServiceMsg = ref(false)

  const addUserSuccessAlert = (msgText: string, onlyDev = false) => {
    userAlerts.value.push({
      isShow: true,
      onlyDev: onlyDev,
      message: msgText,
      status: 'success'
    })
  }
  const addUserErrorAlert = (msgText: string, onlyDev = false) => {
    userAlerts.value.push({
      isShow: true,
      message: msgText,
      onlyDev: onlyDev,
      status: 'error'
    })
  }
  const addUserInfoAlert = (msgText: string, onlyDev = false) => {
    userAlerts.value.push({
      isShow: true,
      message: msgText,
      onlyDev: onlyDev,
      status: 'info'
    })
  }
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
    isInit.value = true;
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', () => handleScroll());
  });
  return {
    isHiddenHeader,
    isHiddenHeaderSite,
    isScrolled,
    isServiceMsg,
    userAlerts,
    addUserInfoAlert,
    addUserSuccessAlert,
    addUserErrorAlert,
    changeIsLoadingPage,
    isLoadingPage
  }
})
