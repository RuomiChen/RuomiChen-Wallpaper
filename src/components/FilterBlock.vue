<script setup lang="ts">
const emit = defineEmits(['update-key'])
const props = defineProps<{
    currentKey:any;
    data: any; // 图片 URL
}>();
</script>
<template>
   
        <div class="cursor-pointer min-w-27 p-2.5  rounded-[30px] text-center shadow-[2px_2px_6px_#191919,-2px_-2px_6px_#514b51]"
            :class="{ 'shadow-[inset_2px_2px_12px_#fff,-2px_-2px_12px_#514b01]': currentKey === item.key }"
            @click="emit('update-key',item.key)" v-for="item in data" :key="item.key">
            {{ item.label }}
        </div>
</template>