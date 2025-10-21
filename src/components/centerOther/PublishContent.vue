<script setup lang="ts">
import { injectLocal, watchDebounced } from '@vueuse/core';
import { ref } from 'vue';
import { useMyFetch } from '../../utils/request';
import WallpaperCard from '../WallpaperCard.vue';
import FilterContent from './FilterContent.vue';

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

const itemsCategory = [
  {
    label: '电脑壁纸',
    key: 'computer'
  }, {
    label: '手机壁纸',
    key: 'mobile'
  }
]
const currentKey = ref('recent')


// 数据容器
const data = ref<any[]>([])
const info_id = injectLocal('info_id')
const category = ref('computer')
// 通用接口地址（可根据 currentKey 动态构造）
const getUrl = (key: string, category: string) => `/api/user/info/${info_id}?type=collect&sort=${key}&category=${category}`
const loading = ref(false)
// 获取数据函数
let controller: AbortController | null = null
async function fetchData() {
  if (controller) controller.abort()
  controller = new AbortController()
  loading.value = true
  try {
    const { data: res, error } = await useMyFetch(getUrl(currentKey.value,category.value), {
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


watchDebounced([currentKey, category], () => fetchData(), { debounce: 300 })

</script>
<template>
   <FilterContent
  :info-id="info_id "
  :sort-options="items"
  :category-options="itemsCategory"
  :api-path="(sortKey, categoryKey) => `/api/user/info/${info_id}?type=collect&sort=${sortKey}&category=${categoryKey}`"
>
  <template #default="{ data }">
    <WallpaperCard v-for="(item, index) in data" :key="index" :data="item" />
  </template>
</FilterContent>
</template>