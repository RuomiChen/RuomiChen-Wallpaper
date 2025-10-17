<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { Button, Column, DataTable } from 'primevue';
import { useI18n } from 'vue-i18n';
import router from '../../router';
import { useGlobalState } from '../../store/user';

defineProps<{
    data: {
        list: [],
        totalInvite: number
        activeUsers: number
        rewards: number
    }
}>();

const { t } = useI18n({ useScope: 'global' })


// 邀请相关

const userState = useGlobalState()
const user = userState.userInfo


const { text, copy, copied, isSupported } = useClipboard({ source: user.value?.inviteCode })
const copyAction = (text: string) => {
    const targetUrl = router.resolve({
        name: 'Center',
        query: { inviteCode: text }
    }).href
    const fullUrl = `${location.origin}${targetUrl}`
    copy(fullUrl)
}
</script>
<template>
    <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
            <h2 class="text-xl font-semibold mb-4">{{t('center.inviteRecordContent.title')}}</h2>
            <div class="flex items-center gap-4">
                <div class="flex-1 /20 backdrop-blur rounded-lg p-4">
                    <div class="text-3xl font-bold tracking-wider max-w-30 truncate md:max-w-none">{{ user?.inviteCode }}</div>
                </div>
                <Button @click="copyAction(user?.inviteCode)" :label="t(!copied ? 'common.copy' : 'common.copied')" icon="pi pi-copy"
                    class="p-button-secondary" />
            </div>
            <p class="text-sm mt-4 text-white/80">
                {{t('center.inviteRecordContent.tip')}}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class=" rounded-lg shadow-sm p-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i class="pi pi-users text-blue-600 text-xl"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold ">{{ data.totalInvite }}</div>
                        <div class="text-sm ">{{t('center.inviteRecordContent.totalInvitation')}}</div>
                    </div>
                </div>
            </div>

            <div class=" rounded-lg shadow-sm p-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i class="pi pi-check-circle text-green-600 text-xl"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold ">{{ data.activeUsers }}</div>
                        <div class="text-sm ">{{t('center.inviteRecordContent.activeUsers')}}</div>
                    </div>
                </div>
            </div>

            <div class=" rounded-lg shadow-sm p-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i class="pi pi-gift text-purple-600 text-xl"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold ">{{ data.rewards }}</div>
                        <div class="text-sm ">{{t('center.inviteRecordContent.cumulativeRewards')}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold  mb-4">{{t('center.inviteRecordContent.invitationRecord')}}</h3>
            <DataTable :value="data.list" :rows="10" paginator :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem">
                <template #empty> No data found. </template>
                <Column field="invitee.nickname" :header="t('center.inviteRecordContent.table.nickName')"></Column>
                <Column field="created" :header="t('center.inviteRecordContent.table.registerTime')" sortable></Column>
                <Column field="status" :header="t('center.inviteRecordContent.table.status')">
                    <template #body="slotProps">
                        <span :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
                            slotProps.data.status === 1
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-red-700'
                        ]">
                            {{ slotProps.data.status === 1 ? 'Active' : 'Not activated' }}
                        </span>
                    </template>
                </Column>
                <Column field="type" :header="t('center.inviteRecordContent.table.type')"></Column>
                <Column field="value" :header="t('center.inviteRecordContent.table.value')"></Column>

            </DataTable>
        </div>
    </div>
</template>