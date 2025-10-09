<template>
    <div
        v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000', leaveClass: 'animate-leave fade-out-0' }">
        <div class="cursor-pointer transition-all mx-12 text-md md:text-3xl font-bold rounded-md hover:bg-black/10 dark:hover:bg-white/10 p-4"
            v-if="title">{{ title }}</div>
        <div class="card">
            <Carousel :value="data" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions">
                <template #item="slotProps">
                    <div class="!h-full border border-surface-200 dark:border-surface-700 rounded mx-2  px-4">
                        <div class="mb-4">
                            <div class="relative ">
                                <Image  preview  :src="getServerSource(slotProps.data?.source)" alt="Image" class="flex flex-col items-center" />
                            </div>
                        </div>
                        <div class="mb-4 font-medium">{{ slotProps.data?.name }}</div>
                    </div>
                </template>
            </Carousel>
        </div>
    </div>

</template>

<script setup>
import { Carousel } from "primevue";
import Image from 'primevue/image';
import { ref } from "vue";
import { getServerSource } from "../utils";
defineProps({
    title: String,
    data: []
})
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const getSeverity = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};


</script>
