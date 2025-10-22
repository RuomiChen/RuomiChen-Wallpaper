<script setup lang="ts">
import { getServerSource } from '../../utils';

const props = defineProps<{ data: any }>();
</script>
<template>
    <div
        class="group mt-10 flex flex-col items-center justify-center duration-400 hover:-translate-y-[15%] hover:bg-[#222] transition-all shadow-[inset_0_0_15px_hsla(0,0%,44%,.5)] blur-1.25 h-[25vh] rounded-[20px]">
        <img class="group-hover:-translate-y-[30%] group-hover:rounded-[50%]  size-30 rounded-[20px] object-cover transition-all duration-400"
            :src="getServerSource(data.source)" />
        <div class="p-8 group-hover:flex hidden group-hover:-translate-y-[40%]  items-center gap-2 transition-all duration-400">
            <div
                class=" dark:text-white font-[500] p-2.5 border border-[#ccc] rounded-[50%] shadow-[inset_0_0_10px_#00000080]">
                123123</div>
            <div
                class=" dark:text-white font-[500] p-2.5 border border-[#ccc] rounded-[50%] shadow-[inset_0_0_10px_#00000080]">
                123123</div>
            <div
                class=" dark:text-white font-[500] p-2.5 border border-[#ccc] rounded-[50%] shadow-[inset_0_0_10px_#00000080]">
                123123</div>
        </div>
    </div>
</template>
