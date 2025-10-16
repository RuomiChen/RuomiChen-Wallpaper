<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMyFetch } from '../utils/request';

const route = useRoute()
const category = computed(() => route.params.category)
// 监听 route.params.category 变化
const url = computed(() => `/api/category/${category.value}`)
const { isFetching, error, data, execute } = useMyFetch(url).json()
// 监听 category 变化
watch(
  () => route.params.category,
  () => {
    execute()
  },
)

import WallpaperCard from '../components/WallpaperCard.vue';


</script>

<template>
  <div v-if="isFetching">loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <div v-if="data?.length" class="grid grid-cols-3 gap-4 w-full">
      <div v-for="(item, index) of data" :key="index" >
        <WallpaperCard :data="item" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>