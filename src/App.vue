<script setup lang="ts">
import { DynamicDialog, Toast, useDialog, useToast } from 'primevue';
import { setDialogInstance } from './utils/dialog';
import { setToastInstance } from './utils/toast';
// 初始化时注册全局实例

const toast = useToast()
const dialog = useDialog()
setToastInstance(toast)
setDialogInstance(dialog)
document.addEventListener('keydown', (e) => {
  // F12
  if (e.key === 'F12') e.preventDefault();

  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) e.preventDefault();

  // Ctrl+U 查看源代码
  if (e.ctrlKey && e.key === 'U') e.preventDefault();
});

// 全局禁用右键
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault();
// });
</script>

<template>
    <router-view />
    <Toast />
    <DynamicDialog />
</template>

<style scoped></style>
