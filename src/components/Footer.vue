<template>
  <footer class=" text-white p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <!-- 左侧 Logo / 名称 -->
    <div class="flex items-center gap-2">
      <span class="font-semibold text-lg">
        <img src="../../public/logo.svg"/>
      </span>
    </div>

    <!-- 中间导航 -->
    <div class="flex items-center gap-4 font-bold">
      <router-link to="/" class="hover:bg-white/5 p-2 rounded-md transition-colors">Home</router-link>
      <router-link to="about" class="hover:bg-white/5 p-2 rounded-md transition-colors">About Us</router-link>
      <router-link to="contact" class="hover:bg-white/5 p-2 rounded-md transition-colors">Contact</router-link>
    </div>

    <!-- 右侧版权 -->
    <div class="text-sm text-gray-400 text-center md:text-right w-full md:w-auto">
      © {{ new Date().getFullYear() }} RuomiChen Wallpaper. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
// 可扩展为接收 props（如 title、links 等）
</script>

<style scoped>
footer a {
  text-decoration: none;
}
</style>
