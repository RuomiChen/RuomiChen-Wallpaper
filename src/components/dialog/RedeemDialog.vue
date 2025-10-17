<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import RedeemRecord from '../table/RedeemRecord.vue';

const data = ref()
const dialogRef = inject('dialogRef');
onMounted(() => {
    data.value = dialogRef.value.data;
})
</script>
<template>
    <div>
        <RedeemRecord :data="data"/>
        <!-- <div v-for="record in data" :key="record._id" class="flex items-center justify-between border-b pb-3">
            <div class="flex items-center gap-4">
                <img :src="record.image || DefaultImg" class="w-16 h-16 rounded object-cover" />
                <div>
                    <h4 class="font-bold text-foreground">{{ record.name }}</h4>
                    <p class="text-sm text-muted-foreground">{{ record.point }} points</p>
                </div>
            </div>
            <div class="text-right text-sm text-muted-foreground">
                {{ formatDate(record.date) }}
            </div>
        </div> -->
    </div>
</template>