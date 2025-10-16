<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { Button, Column, DataTable, Tag, useConfirm } from 'primevue';
import router from '../../router';
import { useGlobalState } from '../../store/user';
import { useMyFetch } from '../../utils/request';
import { AppToast } from '../../utils/toast';

const emit = defineEmits(['reload'])
const props = defineProps<{
    data: any
    isFetching: boolean
}>();
const toProject = (_id?: string, type?: string) => {
    router.push({
        name: 'HandleProject',
        params: { id: _id, type } // 可选
    })
}

enum Status {
    Waiting = 0,
    Success = 1,
    Failed = 2,
    Deleted = 3,
}


const statusMap: Record<Status, { text: string; severity: "success" | "info" | "warn" | "danger" | "secondary" }> = {
    [Status.Waiting]: { text: "Pending", severity: "warn" },
    [Status.Success]: { text: "Success", severity: "success" },
    [Status.Failed]: { text: "Failed", severity: "danger" },
    [Status.Deleted]: { text: "Deleted", severity: "danger" },
}
// ✅ 工具函数
function getStatusText(status: Status): string {
    return statusMap[status]?.text ?? "未知"
}

function getStatusSeverity(status: Status) {
    return statusMap[status]?.severity ?? "secondary"
}

const confirm = useConfirm();
const confirmDelete = (event, id) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this project?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: async () => {
            const { data } = await useMyFetch(`/api/creator/check/${id}`).delete().json()
            emit('reload')
            AppToast.show('info', 'Confirmed', 'Record deleted')
        },
        reject: () => {
            // AppToast.show('error','Rejected', 'Record deleted')
        }
    });
};
const confirmRestore = (event, id) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to restore this project?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Restore',
            severity: 'success'
        },
        accept: async () => {
            const { data, error } = await useMyFetch(`/api/creator/trash_restore/${id}`).json()
            if (!error.value) {
                emit('reload')
                AppToast.success('restore check success')
            }
        },
        reject: () => {
            // AppToast.show('error','Rejected', 'Record deleted')
        }
    });
};

const userState = useGlobalState()
const userInfo = userState.userInfo
</script>

<template>
    <DataTable :value="data" stripedRows :loading="isFetching">
        <template #empty>no data ...</template>
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
                    <Button icon="pi pi-check" v-if="slotProps.data.status == 0 && userInfo.role == 1" text rounded
                        @click="toProject(slotProps.data._id, 'check')" />
                    <Button icon="pi pi-eye" v-else-if="slotProps.data.status == 1" text rounded
                        @click="toProject(slotProps.data._id, 'view')" />
                    <Button icon="pi pi-pencil" v-if="slotProps.data.status != 0 && slotProps.data.status != 3 && slotProps.data.user_id==userInfo._id" text
                        rounded @click="toProject(slotProps.data._id)" />
                    <Button icon="pi pi-trash" v-if="slotProps.data.status != 3" severity="danger" text rounded
                        @click="confirmDelete($event, slotProps.data._id)" />
                    <Button icon="pi pi-undo" v-else severity="danger" text rounded
                        @click="confirmRestore($event, slotProps.data._id)" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>
