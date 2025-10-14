<template>
    <div class="grid md:grid-cols-4  gap-8">
        <div v-for="item in data" :key="item.id"
            v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-t-20 animate-duration-1000' }"
            class="flex flex-col border border-primary-200 shadow-lg justify-center items-center rounded-2xl p-8 gap-4">
            <img :src="getServerSource(item.avatar)" class="rounded-full size-20" />
            <span class="text-2xl font-medium">{{ item.name }}</span>
            <span class="text-muted-color text-center">{{ item.comment }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { PeopleList } from '../types/people';
import { getServerSource } from '../utils';

defineProps<{
    data: PeopleList
}>()

</script>