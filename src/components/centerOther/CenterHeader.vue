<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { Tag } from 'primevue';
import { computed } from 'vue';
import { useGlobalState } from '../../store/user';
import { getServerSource } from '../../utils';
import { useMyFetch } from '../../utils/request';
import { AppToast } from '../../utils/toast';

const props = defineProps<{ data: any }>();

const userState = useGlobalState()
const userInfo = userState.userInfo

// 用 computed 保证 data 更新时，items 自动更新
const items = computed(() => {
    if (!props.data) return []; // 数据还没到，返回空数组

    return [
        { label: '创作', value: props.data.download || 0 },
        { label: '关注', value: props.data.follow || 0 },
        { label: '粉丝', value: props.data.fans || 0 },
    ];
});

const follow = useDebounceFn(async () => {
    if (!userInfo.value) {
        return AppToast.error('请先登录')
    }

    const { data, error } = await useMyFetch(`/api/user/${props.data._id}/follow`).post().json()
    if (!error.value) {
        props.data.is_follow = data.value
        data.value ? props.data.fans++ : props.data.fans--
        AppToast.success(data.value ? '关注成功' : '取消关注成功')
    }
}, 500) // 500ms 防抖时间

</script>
<template>
    <div class="px-4 pt-10 pb-4  flex flex-col gap-5" :style="`background:url(${getServerSource(data.avatar)})`">
        <div class="flex items-center gap-4">
            <div class="relative size-16">
                <img :src="getServerSource(data.avatar)" class="rounded-full size-full" />
                <div @click="follow" :class="data?.is_follow ? 'bg-black' : 'bg-red-600'"
                    class="hover:scale-110 transition-all duration-150 cursor-pointer  p-2 absolute -bottom-2 left-1/3 rounded-full size-4 flex items-center justify-center">
                    <i :class="`pi ${data?.is_follow ? 'pi-times' : 'pi-plus'} text-[12px]`" />
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <div>{{ data.nickname }}</div>
                    <Tag icon="pi pi-map-marker" severity="secondary" v-if="data.detail_ip_info"
                        :value="`${data.detail_ip_info.CountryName} ${data.detail_ip_info.City}`"></Tag>
                    <Tag icon="pi pi-map-marker" severity="secondary" v-else value="暂无"></Tag>
                </div>
                <div class="text-[#cbcbcb] text-[11px]">签名:{{ data.signature }}</div>
            </div>
        </div>
        <div class="flex items-center divide-x-1 divide-amber-100">
            <div v-for="item in items" :key="item.label" class="px-4 flex items-center gap-1">
                <span class="text-[#b7b7b7]">{{ item.label }}</span>
                <span>{{ item.value }}</span>
            </div>
        </div>
    </div>
</template>