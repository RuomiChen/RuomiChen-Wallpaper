<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { Button, Column, DataTable } from 'primevue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '../../router'
import { useGlobalState } from '../../store/user'

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
// 签到相关
const hasCheckedInToday = ref(false)
const consecutiveDays = ref(7)

const checkInCalendar = ref<CheckInDay[]>([
    { date: '2025-01-07', day: 7, checked: true, isToday: false },
    { date: '2025-01-08', day: 8, checked: true, isToday: false },
    { date: '2025-01-09', day: 9, checked: true, isToday: false },
    { date: '2025-01-10', day: 10, checked: true, isToday: false },
    { date: '2025-01-11', day: 11, checked: true, isToday: false },
    { date: '2025-01-12', day: 12, checked: true, isToday: false },
    { date: '2025-01-13', day: 13, checked: false, isToday: true }
])

const checkInRecords = ref<CheckInRecord[]>([
    { date: '2025-01-12', points: 10, consecutive: 6, time: '09:23:15' },
    { date: '2025-01-11', points: 10, consecutive: 5, time: '08:45:32' },
    { date: '2025-01-10', points: 10, consecutive: 4, time: '10:12:08' },
    { date: '2025-01-09', points: 10, consecutive: 3, time: '07:56:41' },
    { date: '2025-01-08', points: 10, consecutive: 2, time: '09:34:22' },
    { date: '2025-01-07', points: 10, consecutive: 1, time: '11:08:55' }
])

const checkIn = () => {
    hasCheckedInToday.value = true
    consecutiveDays.value++
    // 更新日历
    const today = checkInCalendar.value.find(day => day.isToday)
    if (today) {
        today.checked = true
    }
    // 添加签到记录
    checkInRecords.value.unshift({
        date: '2025-01-13',
        points: 10,
        consecutive: consecutiveDays.value,
        time: new Date().toLocaleTimeString('zh-CN')
    })
    console.log('签到成功')
}

// 邀请相关

const userState = useGlobalState()
const user = userState.userInfo
const inviteStats = ref({
    total: 12,
    active: 8,
    rewards: 240
})

const inviteRecords = ref<InviteRecord[]>([
    { username: '李四', registerDate: '2025-01-10', status: 'active', reward: 20 },
    { username: '王五', registerDate: '2025-01-08', status: 'active', reward: 20 },
    { username: '赵六', registerDate: '2025-01-05', status: 'inactive', reward: 20 },
    { username: '孙七', registerDate: '2025-01-03', status: 'active', reward: 20 },
    { username: '周八', registerDate: '2024-12-28', status: 'active', reward: 20 },
    { username: '吴九', registerDate: '2024-12-25', status: 'active', reward: 20 }
])

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
                        <div class="text-sm text-gray-600">总邀请人数</div>
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
                        <div class="text-sm text-gray-600">活跃用户</div>
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
                        <div class="text-sm text-gray-600">累计奖励</div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold  mb-4">邀请记录</h3>
            <DataTable :value="inviteRecords" :paginator="true" :rows="10">
                <Column field="username" header="用户名"></Column>
                <Column field="registerDate" header="注册时间" sortable></Column>
                <Column field="status" header="状态">
                    <template #body="slotProps">
                        <span :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
                            slotProps.data.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                        ]">
                            {{ slotProps.data.status === 'active' ? '活跃' : '未激活' }}
                        </span>
                    </template>
                </Column>
                <Column field="reward" header="获得奖励">
                    <template #body="slotProps">
                        <span class="text-green-600 font-medium">+{{ slotProps.data.reward }} 积分</span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>