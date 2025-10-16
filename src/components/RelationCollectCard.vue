<script setup lang="ts">
import { defineProps } from 'vue';
import { getServerSource } from '../utils';
import CardBody from './inspira/CardBody.vue';
import CardContainer from './inspira/CardContainer.vue';
import CardItem from './inspira/CardItem.vue';

const props = defineProps<{
  data: any  // PrimeIcons 图标类名，比如 "pi-bullseye"
}>()
</script>
<template>
  <CardContainer :turn="false" class="cursor-pointer relative overflow-hidden h-[362px] w-full grid grid-cols-2 gap-4 p-4" v-if="data">
    <CardBody v-for="item in data.data" :key="item"
      class="z-1 overflow-clip group/card !h-full !w-full relative size-auto  sm:w-[30rem] ">
      <CardItem class="w-full rounded-2xl  h-full bg-contain" scale="0.8" :style="`background:url(${getServerSource(item.source)})`">
      </CardItem>
    </CardBody>
    <CardBody
      class="z-2 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]  group/card !w-[54px] !h-[54px]    bg-contain  ">
      <CardItem class="border-white border-2 rounded-full w-full h-full overflow-clip" scale="2.2" >
        <!-- :style="`background:url(${getServerSource(data.user_data.avatar)})`" -->
         <img :src="getServerSource(data.user_data.avatar)" class="w-full h-full"/>
      </CardItem>
    </CardBody>
     <CardBody
      class="-z-1 absolute -top-[10%]  !w-full  group/card  ">
      <CardItem class="w-full h-full " translate-y="32" >
        <div class="text-white md:text-[20px] text-shadow-[0_0_6px_#fff] text-center">
          {{ data.user_data.nickname }}
        </div>
      </CardItem>
    </CardBody>
  </CardContainer>
</template>