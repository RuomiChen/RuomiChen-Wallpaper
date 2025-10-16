<script setup lang="ts">
import { Button, Card, Tag } from 'primevue';
import { getServerSource } from '../../utils';
import { useMyFetch } from '../../utils/request';
import { AppToast } from '../../utils/toast';
const emit = defineEmits(['view'])
const props = defineProps<{
    data: {
        _id: string
        title: string,
        content: string
        status: number
        image: string
    }
}>();

const handle = async (status: number) => {
    const { data, error } = await useMyFetch('/api/creator/tasks').post({ status, id: props.data._id }).json()
    if (!error.value) {
        AppToast.success(`${status == 1 ? 'Finished' : 'Cancel'} Task Success`)
    }
}
const view = (data: any) => {
    emit('view', data)
}
</script>

<template>
    <Card style=" overflow: hidden">
        <template #header>
            <img v-if="data.image" alt="user header" class="" :src="getServerSource(data.image)" />
        </template>
        <template #title>{{ data.title }}</template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button icon="pi pi-eye" class="flex-none" severity="help" @click="view(data)" />
                <template v-if="data.status == 0">
                    <Button label="Cancel" severity="danger" variant="outlined" class="w-full" @click="handle(2)" />
                    <Button label="Finish" icon="pi pi-check" class="w-full" @click="handle(1)" />
                </template>
                <template v-else>
                    <Tag :severity="data.status == 1 ? 'success' : 'danger'"
                        :value="data.status == 1 ? 'Finished' : 'Canceled'">
                    </Tag>
                </template>
            </div>
        </template>
    </Card>
</template>