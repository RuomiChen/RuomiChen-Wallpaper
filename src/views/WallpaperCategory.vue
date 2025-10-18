<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MobileList from '../components/MobileList.vue';
import WallpaperCard from '../components/WallpaperCard.vue';
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
          <WallpaperCard :data="item" v-for="(item, index) of items" :key="index" />
      </div>
    </template>
    <template v-else>
      <MobileList :data="items"/>
    </template>
  </div>
</template>
<style scoped></style>