<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconTitle from '../IconTitle.vue';
import MobileList from '../MobileList.vue';
import WallpaperCard from '../WallpaperCard.vue';
defineProps<{ data: [], mockupType: string }>();
const { t, locale } = useI18n({ useScope: 'global' })

</script>

<template>
   <div>
      <IconTitle icon="pi-bullseye" :title="t('common.similarRecommend')"  />
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