<script setup lang="ts">
import IconTitle from '../IconTitle.vue';
import MobileList from '../MobileList.vue';
import WallpaperCard from '../WallpaperCard.vue';
defineProps<{ data: [], mockupType: string }>();

</script>

<template>
   <div>
      <IconTitle icon="pi-bullseye" title="Similar recommendations" />
      <div class="mt-4">
         <template v-if="!mockupType || mockupType == 'computer'">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" v-if="data.length">
               <WallpaperCard :data="item" v-for="item in data" :key="item" />
            </div>
         </template>
         <template v-else-if="mockupType == 'mobile'">
            <MobileList :data="data" />
         </template>
      </div>
   </div>
</template>