<script setup lang="ts">
import { computed } from 'vue'

interface FeatureItem {
  title: string
  content: string
  icon: string
  color?: string
}

// 父组件传入的数据
const props = defineProps<{
  data: FeatureItem[]
}>()

// 颜色映射
const mappingColor = ['purple-500','teal-500','indigo-500','orange-500']

// 自动映射颜色
const coloredFeatures = computed(() => {
  return props.data?.map((item, index) => ({
    ...item,
    color: mappingColor[index % mappingColor.length]
  }))
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-8 text-center">
    <div v-for="(item, index) in coloredFeatures" :key="index"
      v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }"
      :class="`flex flex-col text-white border-${item.color} bg-${item.color} shadow-lg justify-center items-center rounded-2xl p-8 gap-4`">
      
      <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
        <i :class="`pi ${item.icon} !text-2xl`"></i>
      </div>
      <span class="text-2xl font-bold">{{ item.title }}</span>
      <span>{{ item.content }}</span>
    </div>
  </div>
</template>
