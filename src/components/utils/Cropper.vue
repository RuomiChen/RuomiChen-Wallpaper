<script setup lang="ts">
import { CircleStencil, Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
const res = ref()
function change({ coordinates, canvas }) {
    console.log(coordinates, canvas);
    res.value = canvas.toDataURL('image/png')
}

import { Button } from 'primevue';
import { inject, onMounted, ref } from "vue";
import { getServerSource } from '../../utils';
import { AppDialog } from '../../utils/dialog';
const data = ref()
const dialogRef = inject('dialogRef');
const emit = defineEmits(['success'])
const cropperRef = ref<any>(null)
onMounted(() => {

    data.value = dialogRef.value.data;
})
// 点击确认按钮
function handleConfirm() {
  
    // ✅ 通知父层或关闭对话框
    // 比如使用 AppDialog.close()
    // dialogRef?.value?.close(base64)
    emit('success', res.value)
    AppDialog.close()

}
</script>

<template>
    <Cropper ref="cropperRef" class="size-120" :stencil-component="CircleStencil" :stencil-props="{
    }" :src="getServerSource(data)" @change="change" />
    <Button icon="pi pi-check" severity="success" class="float-right mt-4" @click="handleConfirm" />
</template>
<style scoped></style>