<script setup lang="ts">
import { StorageSerializers, useDateFormat, useStorage } from '@vueuse/core';
import { Button, Divider, useConfirm } from 'primevue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import CreatorCard from '../components/CreatorCard.vue';
import Recommend from '../components/detail/Recommend.vue';
import RelationCollect from '../components/detail/RelationCollect.vue';
import RelationTag from '../components/detail/RelationTag.vue';
import SimpleDIalog from '../components/dialog/SimpleDialog.vue';
import Dock from '../components/utils/Dock.vue';
import DockMobile from '../components/utils/DockMobile.vue';
import router from '../router';
import { useGlobalState } from '../store/user';
import { getServerSource } from '../utils';
import { AppDialog } from '../utils/dialog';
import { useMyFetch } from '../utils/request';
import { AppToast } from '../utils/toast';

const { t, locale } = useI18n({ useScope: 'global' })


const route = useRoute()
const id = computed(() => route.params.id)
// 监听 route.params.category 变化
const url = computed(() => `/api/product/${id.value}`)


const currentMock = ref()

const { data, isFinished, execute } = useMyFetch(url).json()


watch(
    () => data.value,
    (newVal) => {
        if (newVal) {
            currentMock.value = newVal.mockup
        }
    },
    { immediate: true }
)

// 监听 category 变化
watch(
    () => route.params.id,
    () => {
        execute()
        currentMock.value = data.value?.mockup
    }
)


const userState = useGlobalState()

const user = userState.userInfo

// 下载
const confirm = useConfirm();

console.log(user);
const hanleAction = () => {
    confirm.require({
        header: 'Human-machine verification',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Download'
        },
        accept: async () => {
            download()
        },
        reject: () => {
        }
    });
};

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
    const blobUrl = URL.createObjectURL(res2.value!)

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

const collect = async () => {
    const { data: res, error } = await useMyFetch('/api/collect').post({ target_id: data.value._id }).json()
    if (error.value) {
        return router.push({ name: 'Account', query: { type: 'login' } })
    }
    data.value = { ...data.value, ...res.value }
}
enum IOpenType {
    'official'
}
const open = (type: IOpenType) => {
    let setting = useStorage<{
        wechat_img: string
    }>('setting', null, undefined, { serializer: StorageSerializers.object })
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
                    data: setting.value.wechat_img
                }

            });

    }
}

const similarData = ref([])
const collectData = ref([])

watch(
    () => data.value?._id,
    async (id) => {
        if (!id) return
        const { data: res, error } = await useMyFetch(`/api/product/recommend/${id}`).json()
        if (!error.value) {
            similarData.value = res.value
        }
        const { data: res2, error: error2 } = await useMyFetch(`/api/product/collect/${id}`).json()
        if (!error2.value) {
            collectData.value = res2.value
        }

    },
    { immediate: true }
)


</script>

<template>
    <div v-if="!isFinished">loading...</div>
    <div class="flex flex-col py-10 px-2  gap-10   text-[var(--p-content-color)]" v-else>
        <div class="flex md:flex-row flex-col justify-between gap-10 items-center">
            <div class="flex-1 border border-[var(--p-divider-border-color)] p-4 rounded-2xl w-full">
                <Dock v-if="!currentMock || currentMock == 'computer'" :data="data?.source" />
                <DockMobile v-else="currentMock=='mobile'" :data="data?.source" />
            </div>
            <div class="w-full md:w-auto p-3 md:min-w-140 flex flex-col gap-2 border border-[var(--p-divider-border-color)]  rounded-2xl 
            ">
                <!-- info -->
                <div
                    class="p-4 flex flex-col  gap-2 md:gap-8 border border-[var(--p-divider-border-color)]  rounded-2xl">
                    <div class="flex md:flex-row flex-col justify-between md:items-center">
                        <div class="flex-grow flex items-center gap-2">{{t('detail.category')}}：
                            <span v-for="item in data.category">{{ item }}</span>
                        </div>
                        <div class="flex-grow">{{t('detail.resolution')}}： {{ data.resolution }}</div>
                    </div>
                    <div class="flex md:flex-row flex-col justify-between md:items-center">
                        <div class="flex-grow">{{t('detail.color')}}：Unknown</div>
                        <div class="flex-grow flex items-center gap-2">{{t('detail.type')}}：<span v-for="item in data.type">{{ item
                                }}</span>
                        </div>
                    </div>
                    <div class="flex md:flex-row flex-col justify-between md:items-center">
                        <div class="flex-grow">{{t('detail.download')}}：{{ data.download }}</div>
                        <div class="flex-grow">{{t('detail.collect')}}：{{ data.collect }}</div>
                    </div>
                    <div class="text-center">{{t('detail.publishTime')}}：{{ useDateFormat(data.updated, 'YYYY-MM-DD') }}
                    </div>
                </div>
                <CreatorCard :data="data.creator" v-if="data.creator" />
                <div class="mt-auto">
                    <Divider />
                    <div class="flex md:flex-row flex-col md:items-center justify-between px-6 gap-2 md:gap-4">
                        <Button icon="pi pi-download" :label="t('detail.download')" severity="secondary" raised @click="hanleAction" />
                        <Button :icon="`pi ${data.is_collect ? 'pi-heart-fill' : 'pi-heart'}`" 
                        :label="t('detail.collect')"
                            severity="secondary" raised @click="collect" />
                        <Button icon="pi pi-comment" 
                        :label="t('detail.joinGroup')"
                        severity="secondary" raised />
                        <Button icon="pi pi-comment" 
                        :label="t('detail.official')"
                        severity="secondary" raised
                            @click="open(IOpenType.official)" />
                    </div>
                </div>
            </div>
        </div>
        <RelationTag :data="data.tag" />
        <RelationCollect :data="collectData" />
        <Recommend :data="similarData" :mockupType="data.mockup"/>
    </div>
</template>

<style></style>