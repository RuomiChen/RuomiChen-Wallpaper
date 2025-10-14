<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { Button, Column, DataTable } from 'primevue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '../../router'
import { useGlobalState } from '../../store/user'
const props = defineProps<{ data: [] }>();

const route = useRoute()


interface CheckInDay {
    date: string
    day: number
    checked: boolean
    isToday: boolean
}

interface CheckInRecord {
    date: string
    points: number
    consecutive: number
    time: string
}

interface InviteRecord {
    username: string
    registerDate: string
    status: 'active' | 'inactive'
    reward: number
}

// 邀请相关

const userState = useGlobalState()
const user = userState.userInfo
const inviteStats = ref({
    total: 12,
    active: 8,
    rewards: 240
})



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
            <h2 class="text-xl font-semibold mb-4">My invitation code</h2>
            <div class="flex items-center gap-4">
                <div class="flex-1 /20 backdrop-blur rounded-lg p-4">
                    <div class="text-3xl font-bold tracking-wider">{{ user?.inviteCode }}</div>
                </div>
                <Button @click="copyAction(user?.inviteCode)" :label="!copied ? 'Copy' : 'Copied!'" icon="pi pi-copy"
                    class="p-button-secondary" />
            </div>
            <p class="text-sm mt-4 text-white/80">
                Invite friends to register and both parties can receive points rewards
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class=" rounded-lg shadow-sm p-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i class="pi pi-users text-blue-600 text-xl"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold ">{{ inviteStats.total }}</div>
                        <div class="text-sm ">Total number of invitations</div>
                    </div>
                </div>
            </div>

            <div class=" rounded-lg shadow-sm p-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i class="pi pi-check-circle text-green-600 text-xl"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold ">{{ inviteStats.active }}</div>
                        <div class="text-sm ">Active users</div>
                    </div>
                </div>
            </div>

            <div class=" rounded-lg shadow-sm p-6">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i class="pi pi-gift text-purple-600 text-xl"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold ">{{ inviteStats.rewards }}</div>
                        <div class="text-sm ">Cumulative rewards</div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold  mb-4">Invitation Record{{ data }}</h3>
            <DataTable :value="data" :paginator="true" :rows="10">
                <Column field="invitee.nickname" header="Nickname"></Column>
                <Column field="created" header="Registration time" sortable></Column>
                <Column field="status" header="Status">
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
                <Column field="invitee.type" header="Type"></Column>
                <Column field="invitee.value" header="Value"></Column>

            </DataTable>
        </div>
    </div>
</template>