<script setup lang="ts">
import { DynamicDialog, Toast, useDialog, useToast } from 'primevue';
import { setDialogInstance } from './utils/dialog';
import { setToastInstance } from './utils/toast';
// 初始化时注册全局实例

const toast = useToast()
const dialog = useDialog()
setToastInstance(toast)
setDialogInstance(dialog)
</script>

<template>
    <router-view />
    <Toast />
    <DynamicDialog />
</template>

<style scoped></style>
