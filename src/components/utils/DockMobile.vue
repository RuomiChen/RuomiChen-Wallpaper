<script setup lang="ts">
import { getServerSource } from '../../utils';
import IPhone15ProMockup from '../inspira/iPhone15ProMockup.vue';
defineProps<{
    data: string; // 图片 URL
}>();
</script>

<template>
    <IPhone15ProMockup :src="getServerSource(data)" class="size-full max-w-sm mx-auto" />
</template>