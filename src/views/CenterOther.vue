<script setup lang="ts">
import { provideLocal } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CenterContent from '../components/centerOther/CenterContent.vue'
import CenterHeader from '../components/centerOther/CenterHeader.vue'
import { useMyFetch } from '../utils/request'


const route = useRoute()
const user_id = computed(() => route.params.id)
// 监听 route.params.category 变化
const url = computed(() => `/api/user/info/${user_id.value}`)

// 监听 category 变化
const info = ref < any > ()
const loading = ref(false)
const error = ref()
watch(
    () => route.params.id,
    async (val) => {
        provideLocal('info_id', val)
        const { data, isFetching, error: err, isFinished } = await useMyFetch(url).json()
        loading.value = isFetching.value
        error.value = err.value
        if (isFinished && !error.value) {
            info.value = data.value
        }

    }, {
    immediate: true
}
)
</script>
<template>
    <div class="mt-8 flex justify-between text-white" v-if="info">
        <div
            class="flex-1 overflow-clip flex flex-col rounded-2xl shadow-[3px_3px_10px_#191919,-3px_-3px_10px_#514b51]">
            <CenterHeader :data="info" />
            <CenterContent :data="info"/>
        </div>
        <!-- <div class="w-[564px]">123</div> -->
    </div>
</template>
<style >

</style>