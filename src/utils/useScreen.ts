import {ref, onBeforeUnmount, computed, onMounted} from 'vue';

export default function useScreen() {
    const width = ref(process.client ? window.innerWidth : 0);
    const height = ref(process.client ? window.innerHeight : 0);

    const setScreenSizes = () => {
        width.value = process.client ? window.innerWidth: 0
        height.value = process.client ? window.innerHeight: 0
        console.log(isMobile.value)
    };

    const isMobileX4s = computed(() => width.value < 361);
    const isMobileXsss = computed(() => width.value < 451);
    const isMobileXss = computed(() => width.value < 601);
    const isMobileXs = computed(() => width.value < 770);
    const isMobile = computed(() => width.value < 1025);
    const isRangeTablet = computed(() => width.value >= 921 && width.value < 1221);
    const isMaxTablet = computed(() => width.value < 1221);
    const isMaxLaptop = computed(() => width.value < 1441);

    onMounted(() => {
        console.log('width.value', width.value, isMobile.value)
        setScreenSizes();
        window.addEventListener('resize', setScreenSizes);
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', setScreenSizes);
    });

    return { width, height, isMobile, isMaxTablet, isRangeTablet, isMaxLaptop, isMobileXs, isMobileXss, isMobileXsss, isMobileX4s };
}
