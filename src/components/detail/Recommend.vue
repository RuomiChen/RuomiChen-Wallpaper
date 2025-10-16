<script setup lang="ts">
import IconTitle from '../IconTitle.vue';
import WallpaperCard from '../WallpaperCard.vue';
defineProps<{ data: [] }>();

</script>

<template>
    <div>
         <IconTitle  icon="pi-bullseye" title="Similar recommendations" />
         <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" v-if="data.length">
            <WallpaperCard :data="item" v-for="item in data" :key="item"/>
         </div>
         <template v-else>
            no data...
         </template>
    </div>
</template>