<template>

    <div class="flex-1 overflow-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card v-for="stat in stats" :key="stat.title">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm  mb-1">{{ stat.title }}</p>
                            <p class="text-3xl font-bold ">{{ stat.value }}</p>
                            <p class="text-xs  mt-2">
                                <i class="pi pi-arrow-up"></i> {{ stat.change }}
                            </p>
                        </div>
                        <div :class="['w-12 h-12 rounded-full flex items-center justify-center bg-primary/10']">
                            <i :class="[`pi ${stat.icon}`, 'text-2xl text-primary']"></i>
                        </div>
                    </div>
                </template>
            </Card>
        </div>

        <Card>
            <template #title>
                <div class="flex items-center justify-between">
                    <span>Recent Project</span>
                    <Button icon="pi pi-refresh" text rounded />
                </div>
            </template>
            <template #content>
                <ProjectTable :data="data" :isFetching="isFetching"/>
            </template>
        </Card>
    </div>
</template>
<script setup lang="ts">
import { Button, Card } from 'primevue';
import { computed } from 'vue';
import ProjectTable from '../../components/workbench/ProjectTable.vue';
import { useGlobalState } from '../../store/user';
import { useMyFetch } from '../../utils/request';

const { data: statsData, isFetching: statsFetching } = useMyFetch('/api/creator/stats').json()
const { data, isFetching } = useMyFetch('/api/creator/recent').json()

const userState = useGlobalState()
const userInfo = userState.userInfo
const iconData = ['pi-folder', 'pi-check-square', 'pi-check-users']
const stats = computed(() => {
    if (!statsData.value) return []  // 数据还没来，返回空数组
    return statsData.value.map((item:any, index:number) => ({
        ...item,
        icon: iconData[index] ?? ''   // 防止 iconData 不够长度
    }))
})




</script>