<template>
    <!-- <div class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">{{ activeMenu }}</h2>
                <p class="text-sm text-gray-500 mt-1">Manage your {{ activeMenu.toLowerCase() }} here</p>
            </div>
            <div class="flex gap-2">
                <Button label="Export" icon="pi pi-download" severity="secondary" outlined />
                <Button label="Create New" icon="pi pi-plus" />
            </div>
        </div>
    </div> -->

    <div class="flex-1 overflow-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card v-for="stat in stats" :key="stat.title">
                <template #content>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">{{ stat.title }}</p>
                            <p class="text-3xl font-bold text-gray-800">{{ stat.value }}</p>
                            <p class="text-xs text-green-600 mt-2">
                                <i class="pi pi-arrow-up"></i> {{ stat.change }}
                            </p>
                        </div>
                        <div :class="['w-12 h-12 rounded-full flex items-center justify-center bg-primary/10']">
                            <i :class="[stat.icon, 'text-2xl text-primary']"></i>
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
                <DataTable :value="data" stripedRows>
                    <Column field="data.name" header="Name" sortable></Column>
                    <Column field="status" header="Status">
                        <template #body="slotProps">
                            <Tag :value="getStatusText(slotProps.data.status)"
                                :severity="getStatusSeverity(slotProps.data.status)" />
                        </template>
                    </Column>
                    <Column field="updated" header="Date" sortable>
                        <template #body="slotProps">
                            <div>
                                {{ useDateFormat(slotProps.data.updated, 'YYYY-MM-DD HH:mm:ss') }}
                            </div>
                        </template>
                    </Column>
                    <Column field="progress" header="Progress">
                        <template #body="slotProps">
                            <ProgressBar :value="slotProps.data.progress" :showValue="false" />
                        </template>
                    </Column>
                    <Column header="Actions">
                        <template #body="slotProps">
                            <div class="flex gap-2">
                                <Button icon="pi pi-pencil" text rounded @click="toProject(slotProps.data._id)"/>
                                <Button icon="pi pi-trash" severity="danger" text rounded />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { Button, Card, Column, DataTable, Tag } from 'primevue';
import { router } from '../../router';
import { useMyFetch } from '../../utils/request';

const { data } = useMyFetch('/api/creator/recent').json()


const stats = [
    { title: 'Total Projects', value: '24', change: '+12%', icon: 'pi pi-folder' },
    { title: 'Active Tasks', value: '156', change: '+8%', icon: 'pi pi-check-square' },
    { title: 'Team Members', value: '48', change: '+3%', icon: 'pi pi-users' }
]
enum Status {
    Waiting = 0,
    Success = 1,
    Failed = 2,
}

const toProject = (_id?: string) => {
  router.push({
    name: 'HandleProject',
    params: { id: _id } // 可选
  })
}
const statusMap: Record<Status, { text: string; severity: "success" | "info" | "warn" | "danger" | "secondary" }> = {
    [Status.Waiting]: { text: "Pending", severity: "warn" },
    [Status.Success]: { text: "Success", severity: "success" },
    [Status.Failed]: { text: "Failed", severity: "danger" },
}

// ✅ 工具函数
function getStatusText(status: Status): string {
    return statusMap[status]?.text ?? "未知"
}

function getStatusSeverity(status: Status) {
    return statusMap[status]?.severity ?? "secondary"
}
</script>