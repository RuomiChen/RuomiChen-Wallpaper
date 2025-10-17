<script setup lang="ts">
import { defineProps } from 'vue';
import router from '../router';
import { getServerSource } from '../utils';
import CardBody from './inspira/CardBody.vue';
import CardContainer from './inspira/CardContainer.vue';
import CardItem from './inspira/CardItem.vue';

const props = defineProps<{
  data: any  // PrimeIcons 图标类名，比如 "pi-bullseye"
}>()
</script>
<template>
  <CardContainer class="overflow-hidden h-[362px] w-full" v-if="data">
    <CardBody :style="{ backgroundImage: `url(${getServerSource(data.source)})` }"
      class=" bg-repeat bg-cover bg-center group/card !h-full !w-full relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-gray-500/80 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
      <CardItem as="p" translate-y="-420"
        class="overflow-clip flex flex-col  shadow-[2px_2px_8px_#fff1f1] justify-center items-center gap-10 w-full h-full rounded-[40px]  translate-y-100 mt-2  text-sm text-neutral-500 dark:text-neutral-300 dark:bg-[rgba(78,71,71,.6)]">

        <div class="flex items-center gap-2">
          <div
            class=" dark:text-white font-[500] p-2.5 border border-[#ccc] rounded-[50%] shadow-[inset_0_0_10px_#00000080]"
            v-for="category in data.category" :key="category">{{ category }}</div>
        </div>
        <div @click="router.push({ name: 'WallpaperDetail', params: { id: data._id } })"
          class="cursor-pointer hover:scale-120 transition-all shadow-[0_0_10px_#fff1f1] py-2 px-4 rounded-[50px] bg-[rgba(0,0,0,.6)] flex items-center gap-4">
          Detail
          <i class="pi pi-arrow-down-right"></i>
        </div>

        <div class="absolute bottom-0 left-0 w-full py-2 px-8 box-border flex justify-between bg-[rgba(78,71,71,.6)]">
          <div class="flex items-center gap-2">
            <i class="pi pi-heart-fill"></i>
            {{ data.collect }}
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-download"></i>
            {{ data.download }}
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-eye"></i>
            {{ data.view }}
          </div>
        </div>
      </CardItem>

    </CardBody>
  </CardContainer>
</template>