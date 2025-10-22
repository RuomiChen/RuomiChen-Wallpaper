<script setup lang="ts">
import AvatarCard from '../components/avatar/AvatarCard.vue';
import { useMyFetch } from '../utils/request';
const {data} = useMyFetch('/api/avatar/all').json()
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 xl:gap-10">
        <AvatarCard v-for="item in data" :data="item"/>
    </div>
</template>