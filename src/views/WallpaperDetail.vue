<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { Button, Divider } from 'primevue';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import CreatorCard from '../components/CreatorCard.vue';
import SimpleDIalog from '../components/dialog/SimpleDialog.vue';
import Dock from '../components/utils/Dock.vue';
import { useGlobalState } from '../store/user';
import { getServerSource } from '../utils';
import { AppDialog } from '../utils/dialog';
import { useMyFetch } from '../utils/request';
import { AppToast } from '../utils/toast';
const route = useRoute()
const id = computed(() => route.params.id)
// 监听 route.params.category 变化
const url = computed(() => `/api/product/${id.value}`)
const { data, isFinished, execute } = useMyFetch(url).json()
// 监听 category 变化
watch(
    () => route.params.id,
    () => {
        execute()
    }
)
const userState = useGlobalState()

const user = userState.userInfo.value ?? JSON.parse(useStorage('userInfo', '').value)

// 下载
console.log(user);

async function download() {
    let url
    // record
    const { data: res, error } = await useMyFetch(`/api/product/download_record/${data.value._id}`)
        .json()
    if (res.value) {
        AppToast.success('Downloading...')
        url = data.value.source
    } else {
        AppToast.warn('Download count exhausted. Downloading watermarked image instead.')
        const { data: res, error } = await useMyFetch(`/api/product/download/${data.value._id}`)
            .json()
        if (error.value) {
            console.error('水印下载失败：', error.value)
            return
        }
        url = res.value
    }

    const { data: res2, error: error2 } = await useMyFetch(`${getServerSource(url)}`)
        .get()
        .blob()


    if (error2.value) {
        console.error('下载失败：', error2.value)
        return
    }
    console.log(res2.value);

    // 2️⃣ 转为 blob URL
    const blobUrl = URL.createObjectURL(res2.value)

    // 3️⃣ 触发下载
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = 'image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 4️⃣ 释放 blob URL
    URL.revokeObjectURL(blobUrl)
}

const collect = async()=>{
    const {data:res} = await useMyFetch('/api/collect').post({target_id:data.value._id}).json()
    data.value = { ...data.value, is_collect: res.value }
}
enum IOpenType {
    'official'
}
const open = (type: IOpenType) => {
    let setting = useStorage('setting', null)
    if(setting) setting = JSON.parse(setting.value)    
    switch (type) {
        case IOpenType.official:
            AppDialog.open(SimpleDIalog, {
                header: 'Official',
                style: {
                    width: '50vw',
                },
                breakpoints: {
                    '960px': '75vfw',
                    '640px': '90vw'
                },
                data: {
                    type: 'image',
                    data: setting.wechat_img
                }

            });

    }
}
</script>

<template>
    <div v-if="!isFinished">loading...</div>
    <div class="flex flex-col p-10    text-[var(--p-content-color)]" v-else>
        <div class="flex justify-between gap-10">
            <div class="flex-1">
                <Dock :data="data?.source" />
            </div>
            <div class="p-3 min-w-140 flex flex-col gap-2 border border-[var(--p-divider-border-color)]  rounded-2xl 
            ">
                <!-- info -->
                <div class="p-4 grid grid-cols-2 gap-4 border border-[var(--p-divider-border-color)]  rounded-2xl">
                    <div class="flex items-center gap-2">Category：<span v-for="item in data.category">{{ item }}</span>
                    </div>
                    <div>Resolution： 2560x1600</div>
                    <div>Color：Unknown</div>
                    <div></div>
                    <div>Download：{{ data.download }}</div>
                    <div>Collect：{{ data.collect }}</div>
                    <div class="col-span-2 text-center">456</div>
                </div>
                <CreatorCard :data="data.creator" v-if="data.creator" />
                <div class="mt-auto">
                    <Divider />
                    <div class="flex items-center justify-between px-6 ">
                        <Button icon="pi pi-download" label="Download" severity="secondary" raised @click="download" />
                        <Button :icon="`pi ${data.is_collect?'pi-heart-fill':'pi-heart'}`" severity="secondary" raised  @click="collect" />
                        <Button icon="pi pi-comment" label="Jogin Group" severity="secondary" raised />
                        <Button icon="pi pi-comment" label="Official" severity="secondary" raised
                            @click="open(IOpenType.official)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>