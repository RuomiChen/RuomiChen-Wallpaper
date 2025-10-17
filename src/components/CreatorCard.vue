<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { getServerSource } from '../utils';

const props = defineProps<{
    data: any; // 图片 URL
}>();

const { t } = useI18n({ useScope: 'global' })

</script>
<template>
    <div class="flex gap-2 mx-auto py-2">
        <div class="bg-primary rounded-full p-[2px] inline-flex">
            <div class="overflow-hidden rounded-full group">
                <img :src="getServerSource(data.avatar)"
                    class="cursor-pointer size-14 rounded-full transition-transform duration-300 group-hover:scale-120" />
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <div>{{ data.nickname }}</div>
            <div class="text-primary text-[12px] truncate max-w-80">{{t('detail.signature')}}：{{data.signature}}</div>
        </div>
    </div>
</template>