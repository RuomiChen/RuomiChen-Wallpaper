<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import WallpaperCard from '../components/WallpaperCard.vue';
import router from '../router';
import { getServerSource } from '../utils';
import { useMyFetch } from '../utils/request';

const route = useRoute()
const category = computed(() => route.params.category)
// 监听 route.params.category 变化
const url = computed(() => `/api/category/${category.value}`)

// 监听 category 变化
const items = ref<any[]>([])
const loading = ref(false)
const error = ref()
watch(
  () => route.params.category,
  async () => {
    const { data, isFetching, error: err, isFinished } = await useMyFetch(url).json()
    loading.value = isFetching.value
    error.value = err.value
    if (isFinished && !error.value) {
      items.value = data.value.map(item => ({ ...item, inView: false }))

    }

  }, {
  immediate: true
}
)
onMounted(() => {
  setTimeout(() => {
    items.value.forEach((item, index) => {
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
  <div v-if="loading">loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <template v-if="category == 'computer'">
      <div v-if="items?.length" class="grid grid-cols-3 gap-4 w-full">
        <div v-for="(item, index) of items" :key="index">
          <WallpaperCard :data="item" :category="category" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="columns-1 sm:columns-2 md:columns-4  md:gap-8">
        <div v-for="item in items" :key="item.id" class="group relative break-inside-avoid mb-4 box-border">
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
  </div>
</template>
<style scoped></style>