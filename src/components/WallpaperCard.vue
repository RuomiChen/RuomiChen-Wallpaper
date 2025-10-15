<script setup lang="ts">
import { defineProps } from 'vue';
import { router } from '../router';
import { getServerSource } from '../utils';
import CardBody from './inspira/CardBody.vue';
import CardContainer from './inspira/CardContainer.vue';
import CardItem from './inspira/CardItem.vue';

const props = defineProps<{
  data: any  // PrimeIcons 图标类名，比如 "pi-bullseye"
}>()
</script>
<template>
     <CardContainer class="overflow-hidden h-[362px] w-full"    @click="() => router.push({ name: 'WallpaperDetail', params: { id: data._id } })" v-if="data">
      <CardBody   :style="{ backgroundImage: `url(${getServerSource(data.source)})` }"
        class="group/card !h-full !w-full relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-gray-500/80 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
      >
        <CardItem
          as="p"
          translate-y="-270"
          class="  translate-y-100 mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300 dark:bg-gray-600/50"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        
      </CardBody>
    </CardContainer>
</template>