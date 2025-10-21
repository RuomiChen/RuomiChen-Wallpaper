<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { ref } from 'vue'
import { useMyFetch } from '../../utils/request'
import FilterBlock from '../FilterBlock.vue'
import MobileList from '../MobileList.vue'

interface Props {
    infoId: any
    sortOptions: { label: string; key: string }[]
    categoryOptions: { label: string; key: string }[]
    apiPath: (sortKey: string, categoryKey: string) => string
}

const props = defineProps<Props>()

const currentKey = ref(props.sortOptions[0]?.key || '')
const category = ref(props.categoryOptions[0]?.key || '')

const loading = ref(false)
const data = ref<any[]>([])
let controller: AbortController | null = null

async function fetchData() {
    if (controller) controller.abort()
    controller = new AbortController()
    loading.value = true
    try {
        const { data: res, error } = await useMyFetch(
            props.apiPath(currentKey.value, category.value),
            { signal: controller.signal }
        ).json()
        if (!error.value && res.value) data.value = res.value
    } catch (e: any) {
        if (e.name !== 'AbortError') console.error(e)
    } finally {
        loading.value = false
    }
}

// 初始化加载
fetchData()

watchDebounced([currentKey, category], () => fetchData(), { debounce: 300 })
</script>

<template>
    <div class="flex md:flex-row flex-col w-full gap-4">
        <div
            class="md:self-start text-[#b7b7b7] flex flex-col p-3 gap-4 rounded-[30px] shadow-[inset_3px_3px_10px_#191919,inset_-3px_-3px_10px_#514b51]">
            <FilterBlock :data="props.sortOptions" :current-key="currentKey"
                @update-key="(data) => currentKey = data" />
        </div>
        <div class="flex flex-col w-full">
            <div
                class="md:self-start text-[#b7b7b7] flex flex-col md:flex-row p-3 gap-4 rounded-[30px] shadow-[inset_3px_3px_10px_#191919,inset_-3px_-3px_10px_#514b51]">
                <FilterBlock :data="props.categoryOptions" :current-key="category"
                    @update-key="(data) => category = data" />
            </div>
            <div v-if="loading">loading data...</div>
            <div v-else-if="category == 'computer'" class="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <slot :data="data" />
            </div>
            <div v-else="category=='mobile'" class="mt-4">
                <MobileList :data="data" />
            </div>

        </div>
    </div>
</template>
