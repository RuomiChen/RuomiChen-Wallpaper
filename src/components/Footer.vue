<template>
  <footer class=" text-white py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <!-- 左侧 Logo / 名称 -->
    <div class="flex items-center gap-2">
      <img src="../../public/logo.svg" alt="logo" class="h-8 w-8 object-contain" />
      <span class="font-semibold text-lg">RuomiChen Wallpaper</span>
    </div>

    <!-- 中间导航 -->
    <div class="flex flex-wrap items-center justify-center gap-4 font-bold">
      <router-link to="/" class="hover:bg-white/5 p-2 rounded-md transition-colors">Home</router-link>
      <router-link to="/about" class="hover:bg-white/5 p-2 rounded-md transition-colors">About Us</router-link>
      <router-link to="/contact" class="hover:bg-white/5 p-2 rounded-md transition-colors">Contact</router-link>
    </div>

    <!-- 友链展示 -->
    <div class="flex items-center flex-wrap justify-center gap-3 text-sm text-gray-300 mt-2 md:mt-0">
      <a v-for="(link, index) in friendLinks" :key="index" :href="link.url" target="_blank" rel="noopener noreferrer"
        class="hover:text-white transition-colors">
        {{ link.name }}
      </a>
      <Button @click="router.push({name:'Contact'})" icon="pi pi-link" severity="contrast" variant="text" raised rounded aria-label="Apply Link" label="Apply Link" />
    </div>

    <!-- 右侧版权 -->
    <div class="text-xs text-gray-400 text-center md:text-right w-full md:w-auto mt-2 md:mt-0">
      © {{ new Date().getFullYear() }} RuomiChen Wallpaper. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Button } from 'primevue';
import router from '../router';

const friendLinks = [
  { name: 'Pixabay', url: 'https://pixabay.com' },
  { name: 'Pexels', url: 'https://www.pexels.com' },
  { name: 'Unsplash', url: 'https://unsplash.com' },
  { name: 'Freepik', url: 'https://www.freepik.com' },
]
</script>

<style scoped>
footer a {
  text-decoration: none;
}
</style>
