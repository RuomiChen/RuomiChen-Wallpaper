<script setup lang="ts">
import { defineProps } from 'vue';
import { router } from '../router';
import { getServerSource } from '../utils';

const props = defineProps<{
  data: any  // PrimeIcons 图标类名，比如 "pi-bullseye"
}>()
</script>
<template>
  <div @click="() => router.push({ name: 'WallpaperDetail', params: { id: data._id } })" v-if="data"
    class="cursor-pointer bg-[#ffffff1a] shadow-[20px_20px_50px_#00000080] border border-[hsla(0, 0%, 100%, .5)] w-full h-[362px] rounded-md"
    :style="{ backgroundImage: `url(${getServerSource(data.source)})` }">
  </div>
</template>