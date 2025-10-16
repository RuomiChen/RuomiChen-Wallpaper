<script setup lang="ts">

import { Button, Drawer, SelectButton } from 'primevue'
import { ref, watch } from 'vue'
import WriteTaskForm from '../../components/form/WriteTaskForm.vue'
import TaskCard from '../../components/workbench/TaskCard.vue'
import { getServerSource } from '../../utils'
import { useMyFetch } from '../../utils/request'

const value = ref('All')
const options = ref(['All', 'Unfinished', 'Finished', 'Cancled'])

// 先创建空请求
// let { data, isFetching, execute } = useMyFetch('/api/creator/tasks_get').post({ status: 0 }).json()
const data = ref()
const loading = ref(false)
// 🔥 监听 value，每次切换都重新 post
watch(value, async (newVal) => {
    const status = options.value.indexOf(newVal)
    const { data: res, isFetching, execute } = await useMyFetch('/api/creator/tasks_get').post({ status }).json()
    data.value = res.value
    loading.value = isFetching.value
}, { immediate: true })

const visible = ref(false)
const drawerData = ref()
const view = (data: any) => {
    visible.value = true
    drawerData.value = data
}

</script>

<template>
    <div class="flex items-center justify-between">
        <SelectButton v-model="value" :options="options" />
        <Button label="Create" rounded raised @click="{drawerData = null;visible = true}" />
    </div>
    <div v-if="loading">loading data...</div>
    <div v-else-if="data.length" class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <TaskCard v-for="item in data" :key="item" :data="item" @view="view" />
    </div>
    <template v-else>
        no data ...
    </template>
    <Drawer v-model:visible="visible" :header="drawerData?.title || 'Write'" position="right">
        <p class="bg-contain bg-no-repeat" v-if="drawerData"
            :style="{ 'background': `url(${getServerSource(drawerData?.image)})` }" v-html="drawerData.content"></p>
        <template v-else>
           <WriteTaskForm/>
        </template>
    </Drawer>
</template>