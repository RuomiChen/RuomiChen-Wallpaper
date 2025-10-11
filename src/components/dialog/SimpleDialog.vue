<template>
    <div class="flex flex-col gap-4">
        <template v-if="data?.type == 'image'">
            <img :src="getServerSource(data?.data)" class="w-80 object-contain" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { getServerSource } from "../../utils";
const data = ref()
const dialogRef = inject('dialogRef');
onMounted(() => {
    data.value = dialogRef.value.data;
})
</script>
