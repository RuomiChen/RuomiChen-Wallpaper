<script setup lang="ts">
import { injectLocal } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useMyFetch } from '../../utils/request';
import WallpaperCard from '../WallpaperCard.vue';

const items = [
    {
        label: '最近的',
        key: 'recent'
    }, {
        label: '浏览量',
        key: 'view'
    }, {
        label: '收藏量',
        key: 'collect'
    }, {
        label: '下载量',
        key: 'download'
    },
]
const currentKey = ref('recent')


// 数据容器
const data = ref<any[]>([])
const info_id = injectLocal('info_id') 
// 通用接口地址（可根据 currentKey 动态构造）
const getUrl = (key: string) => `/api/user/info/${info_id}?type=collect&sort=${key}`
const loading = ref(false)
// 获取数据函数
let controller: AbortController | null = null
async function fetchData() {
  if (controller) controller.abort()
  controller = new AbortController()
  loading.value = true
  try {
    const { data: res, error } = await useMyFetch(getUrl(currentKey.value), {
      signal: controller.signal
    }).json()
    if (!error.value && res.value) data.value = res.value
  } catch (e: any) {
    if (e.name !== 'AbortError') console.error(e)
  } finally {
    loading.value = false
  }
}

// 初始化加载
fetchData()

// 监听 currentKey 变化
watch(currentKey, () => {
  fetchData()
})
</script>
<template>
    <div class="min-h-[740px] flex justify-between gap-10">
        <div
            class="self-start text-[#b7b7b7] flex flex-col p-3 gap-4 rounded-[30px] shadow-[inset_3px_3px_10px_#191919,inset_-3px_-3px_10px_#514b51]">
            <div class="cursor-pointer min-w-27 p-2.5  rounded-[30px] text-center shadow-[2px_2px_6px_#191919,-2px_-2px_6px_#514b51]"
                :class="{ 'shadow-[inset_2px_2px_12px_#fff,-2px_-2px_12px_#514b01]': currentKey === item.key }"
                @click="currentKey = item.key" v-for="item in items" :key="item.key">
                {{ item.label }}
            </div>
        </div>
        <div v-if="loading">loading data...</div>
        <div v-else class="grid grid-cols-3 gap-4 w-full">
          <WallpaperCard :data="item" v-for="(item, index) of data" :key="index" />
        </div>

    </div>
</template>