<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import router from '../router';
import { getServerSource } from '../utils';
const props = defineProps<{
  data: any  // PrimeIcons 图标类名，比如 "pi-bullseye"
}>()
onMounted(() => {
    setTimeout(() => {
        props.data.forEach((item, index) => {
            const el = document.querySelectorAll('.break-inside-avoid')[index]
            if (!el) return
            const { stop } = useIntersectionObserver(
                el,
                ([{ isIntersecting }]) => {
                    if (isIntersecting) {
                        item.inView = true
                        stop() // 停止监听
                    }
                },
                { threshold: 0.1 }
            )
        })
    }, 1000)
})


// 可以加无限滚动
const loadMoreTrigger = ref<HTMLElement>()
useIntersectionObserver(
    loadMoreTrigger,
    ([{ isIntersecting }]) => {
        if (isIntersecting && !loading.value) {
            // execute()
        }
    },
    { threshold: 0.1 }
)
</script>
<template>
    <div class="columns-1 sm:columns-2 md:columns-4  md:gap-8">
        <div v-for="item in data" :key="item.id" class="group relative break-inside-avoid mb-4 box-border">
            <img :src="getServerSource(item.source)" :alt="item.title"
                class="w-full h-full rounded-xl duration-250 shadow-[6px_6px_5px_5px_#00000080] dark:shadow-[6px_6px_5px_5px_#fff]  hover:scale-105" />
            <div @click="router.push({ name: 'WallpaperDetail', params: { id: item._id } })"
                class="absolute bottom-20 left-1/2 -translate-x-1/2 mx-auto cursor-pointer group-hover:opacity-100 opacity-0 transition-all shadow-[0_0_10px_#fff1f1] py-3 px-8 rounded-[50px] border dark:border-white bg-[rgba(0,0,0,.6)] flex items-center gap-4">
                Detail
                <i class="pi pi-arrow-down-right"></i>
            </div>
        </div>
    </div>
</template>