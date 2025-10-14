<template>
  <div class="flex items-center gap-2">
    <i :class="['pi', icon, 'text-primary text-xl']"></i>
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
      {{ title }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  icon: string  // PrimeIcons 图标类名，比如 "pi-bullseye"
  title: string // 标题文字
}>()
</script>