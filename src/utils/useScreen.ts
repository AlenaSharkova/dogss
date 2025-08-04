import {ref, onBeforeUnmount, computed, onMounted} from 'vue';

export default function useScreen() {
    const width = ref(process.client ? window.innerWidth : 0);
    const height = ref(process.client ? window.innerHeight : 0);

    const setScreenSizes = () => {
        width.value = process.client ? window.innerWidth: 0
        height.value = process.client ? window.innerHeight: 0
        console.log(isMobile.value)
    };

    const isMobileS = computed(() => width.value < 361);
    const isMobileM = computed(() => width.value < 451);
    const isMobile = computed(() => width.value < 1025);
    const isMaxTablet = computed(() => width.value < 1221);
    const isMaxLaptop = computed(() => width.value < 1441);

    onMounted(() => {
        setScreenSizes();
        window.addEventListener('resize', setScreenSizes);
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', setScreenSizes);
    });

    return { width, height, isMobile, isMaxTablet, isMaxLaptop, isMobileM, isMobileS };
}
